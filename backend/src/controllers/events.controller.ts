import express from 'express';
import { Server } from 'socket.io';

import InstaLog from '../library/InstaLog';
import GenericError from '../utilities/genericError';
import EventType from '../types/Event';

export default class Event {
    public path = "/events";
    public router = express.Router();
    private io: Server;

    private PAGE_SIZE = 10;

    constructor(io: Server) {
        this.initRoutes();
        this.io = io;
    }   

    initRoutes() {
        this.router.get(this.path , this.getEvents);
        this.router.post(this.path , this.postEvents);
    }

    async getEvents(
        req: express.Request,
        res: express.Response,
        next: Function
    ) {
        try {
            const instaLog = new InstaLog("my secret");

            let events: any;

            let { searchTerm, pageNumber } = req.query;
            console.log(req.query);
            
            if(searchTerm) {
                events = await instaLog.searchEvents({searchTerm, pageNumber})
            } else {
                events = await instaLog.listEvents(req.query || undefined);
            }
            return res.status(200).json(events);
            
        } catch(e) {
            next(new GenericError(400, "Failed to fetch data"));
        }

    }
    

    async postEvents(
        req: express.Request,
        res: express.Response,
        next: Function
    ) {
        try {
            
            const instaLog = new InstaLog("my secret");
            
            // console.log(req.body);
            const {
                object,
                actor_id,
                actor_name,
                group,
                action_id,
                target_id,
                target_name,
                location,
                occurred_at,
                metadataId
            } = req.body;
            
            
            const missingFields = [];
        
            if (!object) missingFields.push('object');
            if (!actor_id) missingFields.push('actor_id');
            if (!actor_name) missingFields.push('actor_name');
            if (!group) missingFields.push('group');
            if (!action_id) missingFields.push('action_id');
            if (!target_id) missingFields.push('target_id');
            if (!target_name) missingFields.push('target_name');
            if (!location) missingFields.push('location');
            if (!occurred_at) missingFields.push('occurred_at');
            if (!metadataId) missingFields.push('metadataId');
        
            if (missingFields.length > 0) {
                return res.status(400).json({
                    error: 'Missing required fields',
                    missingFields
                });
            }


            const event : EventType = {
                object,
                actor_id,
                actor_name,
                group,
                action_id,
                target_id,
                target_name,
                location,
                occurred_at,
                metadataId
            };
    
            const event_created = await instaLog.createEvent(event);
    
            // Emit the event to all connected clients
            this.io.emit('newEvent', event);

            return res.status(201).json({
                message: 'Event created successfully',
                event_created
            });
            
        } catch(e: any) {
            next(new GenericError(400, e.message));
        }

    }

    
}
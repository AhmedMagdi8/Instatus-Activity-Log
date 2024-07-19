"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InstaLog_1 = __importDefault(require("../library/InstaLog"));
const genericError_1 = __importDefault(require("../utilities/genericError"));
class Event {
    constructor(io) {
        this.path = "/events";
        this.router = express_1.default.Router();
        this.PAGE_SIZE = 10;
        this.initRoutes();
        this.io = io;
    }
    initRoutes() {
        this.router.get(this.path, this.getEvents);
        this.router.post(this.path, this.postEvents);
    }
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instaLog = new InstaLog_1.default("my secret");
                let events;
                let { searchTerm, pageNumber } = req.query;
                console.log(req.query);
                if (searchTerm) {
                    events = yield instaLog.searchEvents({ searchTerm, pageNumber });
                }
                else {
                    events = yield instaLog.listEvents(req.query || undefined);
                }
                return res.status(200).json(events);
            }
            catch (e) {
                next(new genericError_1.default(400, "Failed to fetch data"));
            }
        });
    }
    postEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instaLog = new InstaLog_1.default("my secret");
                // console.log(req.body);
                const { object, actor_id, actor_name, group, action_id, target_id, target_name, location, occurred_at, metadataId } = req.body;
                const missingFields = [];
                if (!object)
                    missingFields.push('object');
                if (!actor_id)
                    missingFields.push('actor_id');
                if (!actor_name)
                    missingFields.push('actor_name');
                if (!group)
                    missingFields.push('group');
                if (!action_id)
                    missingFields.push('action_id');
                if (!target_id)
                    missingFields.push('target_id');
                if (!target_name)
                    missingFields.push('target_name');
                if (!location)
                    missingFields.push('location');
                if (!occurred_at)
                    missingFields.push('occurred_at');
                if (!metadataId)
                    missingFields.push('metadataId');
                if (missingFields.length > 0) {
                    return res.status(400).json({
                        error: 'Missing required fields',
                        missingFields
                    });
                }
                const event = {
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
                const event_created = yield instaLog.createEvent(event);
                // Emit the event to all connected clients
                this.io.emit('newEvent', event);
                return res.status(201).json({
                    message: 'Event created successfully',
                    event_created
                });
            }
            catch (e) {
                next(new genericError_1.default(400, e.message));
            }
        });
    }
}
exports.default = Event;

import express, { Application } from 'express';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import { Server } from 'socket.io';

import dotenv from 'dotenv';
import cors from 'cors';

import EventRouter from './controllers/events.controller';

import cronJob from './utilities/cron';

dotenv.config();

class App {
    public port: number | string;
    public app: Application;
    public server: http.Server;
    public io: Server;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.port = process.env.PORT || 8080;
        this.server = http.createServer(this.app);
        // Initialize Socket.IO server
        this.io = new Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }});

        this.initializeRoutes();
        this.initializeSocket();

        this.app.use(
            (
              error: any,
              req: express.Request,
              res: express.Response,
              next: Function
            ) => {
                console.log(error);
                res.status(error.httpCode).send(error.message);
              }
            
          );
        // cronJob -- Run the cronJob to add records to the database automatically
        cronJob();
        // cronJob
    }


    private initializeRoutes() {

        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        });

        const eventRouter = new EventRouter(this.io);
        this.app.use('/', eventRouter.router);

    }

    private initializeSocket() {
        this.io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        });
    }
}

const app = new App();
app.listen();

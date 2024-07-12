import express, { Application } from 'express';
import dotenv from 'dotenv';

import EventRouter from './controllers/events.controller';

import cronJob from './utilities/cron';

dotenv.config();

class App {
    public port: number | string;
    public app: Application;


    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.port = process.env.PORT || 8080;
        this.initializeRoutes();
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

        const eventRouter = new EventRouter();
        this.app.use('/', eventRouter.router);

    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        })
    }
}

const app = new App();
app.listen();

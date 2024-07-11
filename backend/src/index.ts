import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

class App {
    public port: number | string;
    public app: Application;


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.initializeRoutes();
        // this.initializeErrorHandling();
        // this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        // Add your middlewares here, e.g.:
        // this.app.use(express.json());
    }

    private initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }

    private initializeErrorHandling() {
        // Add error handling middleware if necessary, e.g.:
        // this.app.use((err, req, res, next) => {
        //   res.status(500).send('Something went wrong!');
        // });
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        })
    }
}

const app = new App();
app.listen();

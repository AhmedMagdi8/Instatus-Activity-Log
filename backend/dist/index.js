"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const events_controller_1 = __importDefault(require("./controllers/events.controller"));
const cron_1 = __importDefault(require("./utilities/cron"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.port = process.env.PORT || 8080;
        this.server = http_1.default.createServer(this.app);
        // Initialize Socket.IO server
        this.io = new socket_io_1.Server(this.server);
        this.initializeRoutes();
        this.initializeSocket();
        this.app.use((error, req, res, next) => {
            console.log(error);
            res.status(error.httpCode).send(error.message);
        });
        // cronJob -- Run the cronJob to add records to the database automatically
        (0, cron_1.default)();
        // cronJob
    }
    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        const eventRouter = new events_controller_1.default(this.io);
        this.app.use('/', eventRouter.router);
    }
    initializeSocket() {
        this.io.on('connection', (socket) => {
            console.log('A user connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        });
    }
}
const app = new App();
app.listen();

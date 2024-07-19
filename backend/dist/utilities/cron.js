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
const node_cron_1 = __importDefault(require("node-cron"));
const InstaLog_1 = __importDefault(require("../library/InstaLog"));
const startCronJob = () => {
    const instaLog = new InstaLog_1.default('mysecret');
    const task = () => __awaiter(void 0, void 0, void 0, function* () {
        yield instaLog.createEvent(); // Empty parameter means use seed function to store dummy data
        console.log('cron job task every 1 minutes');
    });
    // Schedule the task to run every 5 minutes
    node_cron_1.default.schedule('*/1 * * * *', task);
};
exports.default = startCronJob;

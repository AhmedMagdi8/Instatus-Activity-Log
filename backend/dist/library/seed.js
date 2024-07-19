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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create EventActions
        const eventAction1 = yield prisma.eventAction.create({
            data: {
                object: 'event_action',
                name: 'user.login_succeeded'
            }
        });
        const eventAction2 = yield prisma.eventAction.create({
            data: {
                object: 'event_action',
                name: 'user.logout'
            }
        });
        // Create Metadata
        const metadata1 = yield prisma.metadata.create({
            data: {
                redirect: '/setup',
                description: 'User login succeeded.',
                xRequestId: 'req_W1Y13QOHMI5H'
            }
        });
        const metadata2 = yield prisma.metadata.create({
            data: {
                redirect: '/logout',
                description: 'User logout succeeded.',
                xRequestId: 'req_K2L15PQJK9Y3'
            }
        });
        // Create Events
        const event1 = yield prisma.event.create({
            data: {
                object: 'event',
                actor_id: 'user_3VG74289PUA2',
                actor_name: 'Ali Salah',
                group: 'instatus.com',
                actionId: eventAction1.id,
                target_id: 'user_DOKVD1U3L030',
                target_name: 'ali@instatus.com',
                location: '105.40.62.95',
                occurred_at: new Date(),
                metadataId: metadata1.id
            }
        });
        const event2 = yield prisma.event.create({
            data: {
                object: 'event',
                actor_id: 'user_4BL3P5T67QW9',
                actor_name: 'Ahmed Magdy',
                group: 'example.com',
                actionId: eventAction2.id,
                target_id: 'user_XYZ456ABC789',
                target_name: 'ahmed@instatus.com',
                location: '192.168.1.1',
                occurred_at: new Date(),
                metadataId: metadata2.id
            }
        });
    });
}

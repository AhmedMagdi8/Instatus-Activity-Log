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
const prisma_1 = __importDefault(require("../utilities/prisma"));
const genericError_1 = __importDefault(require("../utilities/genericError"));
const seed_1 = __importDefault(require("./seed"));
class InstaLog {
    constructor(secretKey) {
        this.PAGE_SIZE = 10;
        this.secretKey = secretKey;
    }
    listEvents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { actor_id, target_id, action_id, name, pageNumber, search } = query;
                const result = yield prisma_1.default.event.findMany({
                    where: {
                        actor_id: actor_id || undefined,
                        target_id: target_id || undefined,
                        actionId: action_id || undefined,
                        action: {
                            name: name || undefined
                        }
                    },
                    include: {
                        action: true,
                        metadata: true
                    },
                    orderBy: {
                        occurred_at: 'desc',
                    },
                    skip: this.PAGE_SIZE * ((!pageNumber || pageNumber < 1 ? 1 : pageNumber) - 1),
                    take: this.PAGE_SIZE
                });
                return result;
            }
            catch (e) {
                console.log(e);
                return new genericError_1.default(400, "Something went wrong");
            }
        });
    }
    searchEvents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { searchTerm, pageNumber } = query;
            console.log(searchTerm);
            const events = yield prisma_1.default.event.findMany({
                where: {
                    OR: [
                        {
                            actor_name: {
                                contains: searchTerm,
                            },
                        },
                        {
                            target_name: {
                                contains: searchTerm,
                            },
                        },
                        {
                            action: {
                                name: {
                                    contains: searchTerm,
                                },
                            },
                        },
                    ],
                },
                orderBy: {
                    occurred_at: 'desc',
                },
                include: {
                    action: true, // To include related action details
                    metadata: true, // To include related metadata details
                },
                skip: this.PAGE_SIZE * ((!pageNumber || pageNumber < 1 ? 1 : pageNumber) - 1),
                take: this.PAGE_SIZE
            });
            return events;
        });
    }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (event) {
                    console.log("Inside Event");
                    const { object, actor_id, actor_name, group, action_id, target_id, target_name, location, occurred_at, metadataId } = event;
                    const newEvent = yield prisma_1.default.event.create({
                        data: {
                            object: object,
                            actor_id: actor_id,
                            actor_name: actor_name,
                            group: group,
                            actionId: action_id,
                            target_id: target_id,
                            target_name: target_name,
                            location: location,
                            occurred_at: occurred_at,
                            metadataId: metadataId
                        }
                    });
                    console.log("created Successfully");
                    return newEvent;
                }
                else {
                    (0, seed_1.default)()
                        .catch((e) => {
                        console.error(e);
                        process.exit(1);
                    })
                        .finally(() => __awaiter(this, void 0, void 0, function* () {
                        yield prisma_1.default.$disconnect();
                    }));
                }
            }
            catch (e) {
                console.log(e);
                return new genericError_1.default(400, "Something went wrong");
            }
        });
    }
}
exports.default = InstaLog;

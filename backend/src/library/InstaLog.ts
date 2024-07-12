import prisma from "../utilities/prisma";
import GenericError from "../utilities/genericError";
import seed from "./seed";
import Event from "../types/Event";


export default class InstaLog {
    private secretKey: string;
    private PAGE_SIZE = 10;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public async listEvents(query: any) {
        try {

            const { actor_id, target_id, action_id, name, pageNumber, search } = query;



            const result = await prisma.event.findMany({
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
                skip: this.PAGE_SIZE * ((!pageNumber || pageNumber < 1 ? 1 : pageNumber) - 1),
                take: this.PAGE_SIZE
            });

            return result;
        } catch (e) {
            console.log(e);
            return new GenericError(400, "Something went wrong");
        }
    }


    public async searchEvents(query: any) {

        const { searchTerm, pageNumber } = query;

        console.log(searchTerm);

        const events = await prisma.event.findMany({
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
            include: {
                action: true, // To include related action details
                metadata: true, // To include related metadata details
            },
            skip: this.PAGE_SIZE * ((!pageNumber || pageNumber < 1 ? 1 : pageNumber) - 1),
            take: this.PAGE_SIZE
        });

        return events;
    }

    public async createEvent(event?: Event) {
        try {

            if (event) {
                console.log("Inside Event");

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
                } = event;

                const newEvent = await prisma.event.create({
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

            } else {
                seed()
                    .catch((e) => {
                        console.error(e);
                        process.exit(1);
                    })
                    .finally(async () => {
                        await prisma.$disconnect();
                    });
            }
        } catch (e) {
            console.log(e);
            return new GenericError(400, "Something went wrong");
        }
    }

}
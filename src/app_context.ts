import { PrismaClient } from "@prisma/client";
export type AppContext = {
    store: {
        prisma: PrismaClient;
    };
};

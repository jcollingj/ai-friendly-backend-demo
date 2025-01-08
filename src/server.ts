import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { AppContext } from "./app_context";
import { workout_type_routes } from "./endpoints.ts/workout_types";

export const app = new Elysia()

    .use((app) => app.decorate("store", { prisma: new PrismaClient() }))
    .derive(({ store }): AppContext => ({ store }))
    .use(swagger())
    .use(workout_type_routes)

    .listen(3000, () => {
        console.log(`🦊 Server is running at http://localhost:3000`);

        console.log(`📚 Swagger documentation available at http://localhost:3000/swagger`);
    });

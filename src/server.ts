import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { AppContext } from "./app_context";
import { workout_type_routes } from "./endpoints/workout_types";
import { workout_routes } from "./endpoints/workouts";

export const app = new Elysia()

    .use((app) => app.decorate("store", { prisma: new PrismaClient() }))
    .derive(({ store }): AppContext => ({ store }))
    .use(swagger())
    .use(workout_type_routes)
    .use(workout_routes)

    .listen(8080, () => {
        console.log(`🦊 Server is running at http://localhost:8080`);

        console.log(`📚 Swagger documentation available at http://localhost:8080/swagger`);
    });

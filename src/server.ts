import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "@prisma/client";
import { WorkoutTypeSchema, WorkoutTypeCreateSchema, WorkoutTypeUpdateSchema } from "./types";
import {
    workout_type_create,
    workout_type_get_by_id,
    workout_type_update,
    workout_type_delete,
    workout_type_list_for_user_id,
} from "./db";

type AppContext = {
    store: {
        prisma: PrismaClient;
    };
};

export const app = new Elysia()
    .use(swagger())
    .use((app) => app.decorate("store", { prisma: new PrismaClient() }))
    .derive(({ store }): AppContext => ({ store }))
    .group("/workout-types", (app) =>
        app
            .post(
                "/",
                async ({ body, store: { prisma }, set }) => {
                    try {
                        const workoutType = await workout_type_create(prisma, body);
                        return { data: workoutType };
                    } catch (error) {
                        console.error("Error creating workout type:", error);
                        set.status = 500;
                        return { message: "Failed to create workout type" };
                    }
                },
                {
                    body: WorkoutTypeCreateSchema,
                    response: {
                        200: t.Object({
                            data: WorkoutTypeSchema,
                        }),
                        500: t.Object({
                            message: t.String(),
                        }),
                    },
                }
            )
            .post(
                "/get-by-id",
                async ({ store: { prisma }, set, body }) => {
                    try {
                        const workoutType = await workout_type_get_by_id(prisma, body.id);
                        return { data: workoutType };
                    } catch (error) {
                        console.error("Error retrieving workout type:", error);
                        set.status = 500;
                        return { message: "Failed to retrieve workout type" };
                    }
                },
                {
                    body: t.Object({
                        id: t.Integer(),
                    }),
                    response: {
                        200: t.Object({
                            data: WorkoutTypeSchema,
                        }),
                        404: t.Object({
                            message: t.String(),
                        }),
                        500: t.Object({
                            message: t.String(),
                        }),
                    },
                }
            )
            .post(
                "/list",
                async ({ store: { prisma }, set, body }) => {
                    try {
                        const workoutTypes = await workout_type_list_for_user_id(prisma, body.user_id);
                        return { data: workoutTypes };
                    } catch (error) {
                        console.error("Error listing workout types:", error);
                        set.status = 500;
                        return { message: "Failed to list workout types" };
                    }
                },
                {
                    body: t.Object({
                        user_id: t.String(),
                    }),
                    response: {
                        200: t.Object({
                            data: t.Array(WorkoutTypeSchema),
                        }),
                        404: t.Object({
                            message: t.String(),
                        }),
                        500: t.Object({
                            message: t.String(),
                        }),
                    },
                }
            )
            .post(
                "/update",
                async ({ store: { prisma }, set, body }) => {
                    try {
                        const { id, ...data } = body;
                        const updatedWorkoutType = await workout_type_update(prisma, id, data);
                        return { data: updatedWorkoutType };
                    } catch (error) {
                        console.error("Error updating workout type:", error);
                        set.status = 500;
                        return { message: "Failed to update workout type" };
                    }
                },
                {
                    body: t.Intersect([t.Object({ id: t.Integer() }), WorkoutTypeUpdateSchema]),
                    response: {
                        200: t.Object({
                            data: WorkoutTypeSchema,
                        }),
                        404: t.Object({
                            message: t.String(),
                        }),
                        500: t.Object({
                            message: t.String(),
                        }),
                    },
                }
            )
            .post(
                "/delete",
                async ({ store: { prisma }, set, body }) => {
                    try {
                        const deletedWorkoutType = await workout_type_delete(prisma, body.id);
                        return { data: deletedWorkoutType };
                    } catch (error) {
                        console.error("Error deleting workout type:", error);
                        set.status = 500;
                        return { message: "Failed to delete workout type" };
                    }
                },
                {
                    body: t.Object({
                        id: t.Integer(),
                    }),
                    response: {
                        200: t.Object({
                            data: WorkoutTypeSchema,
                        }),
                        404: t.Object({
                            message: t.String(),
                        }),
                        500: t.Object({
                            message: t.String(),
                        }),
                    },
                }
            )
    )
    .listen(3000, () => {
        console.log(`🦊 Server is running at http://localhost:3000`);

        console.log(`📚 Swagger documentation available at http://localhost:3000/swagger`);
    });

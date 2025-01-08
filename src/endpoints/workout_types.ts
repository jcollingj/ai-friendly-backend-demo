import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";
import {
    WorkoutTypeSchema,
    WorkoutTypeCreateSchema,
    WorkoutTypeUpdateSchema,
    WorkoutTypeUpdateRequestSchema,
} from "../types";
import {
    workout_type_create,
    workout_type_get_by_id,
    workout_type_update,
    workout_type_delete,
    workout_type_list_for_user_id,
    prisma,
} from "../db";
import { AppContext } from "../app_context";

export const workout_type_routes = new Elysia({ prefix: "/workout-types" })
    .use((app) => app.decorate("store", { prisma }))
    .derive(({ store }): AppContext => ({ store }))
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
                const { id, update_data } = body;
                const updatedWorkoutType = await workout_type_update(prisma, id, update_data);
                return { data: updatedWorkoutType };
            } catch (error) {
                console.error("Error updating workout type:", error);
                set.status = 500;
                return { message: "Failed to update workout type" };
            }
        },
        {
            body: WorkoutTypeUpdateRequestSchema,

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
    );

import { Elysia, t } from "elysia";
import { WorkoutCreateSchema, WorkoutSchema, WorkoutUpdateRequestSchema } from "../types";
import {
    workout_update,
    workout_create,
    workout_get_by_id,
    workout_list_for_user_id,
    workout_delete,
    prisma,
} from "../db";
import { PrismaClient } from "@prisma/client";
import { AppContext } from "../app_context";

export const workout_routes = new Elysia({ prefix: "/workouts" })
    .use((app) => app.decorate("store", { prisma }))
    .derive(({ store }): AppContext => ({ store }))
    .post(
        "/",
        async ({ body, store: { prisma }, set }) => {
            try {
                const workout = await workout_create(prisma, body);
                return { data: workout };
            } catch (error) {
                console.error("Error creating workout:", error);
                set.status = 500;
                return { message: "Failed to create workout" };
            }
        },
        {
            body: WorkoutCreateSchema,
            response: {
                200: t.Object({
                    data: WorkoutSchema,
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
                const { workout_id } = body;
                const workout = await workout_get_by_id(prisma, workout_id);
                return { data: workout };
            } catch (error) {
                console.error("Error retrieving workout:", error);
                set.status = 500;
                return { message: "Failed to retrieve workout" };
            }
        },
        {
            body: t.Object({
                workout_id: t.Number(),
            }),
            response: {
                200: t.Object({
                    data: WorkoutSchema,
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
                const { user_id } = body;
                const workouts = await workout_list_for_user_id(prisma, user_id);
                return { data: workouts };
            } catch (error) {
                console.error("Error listing workouts:", error);
                set.status = 500;
                return { message: "Failed to list workouts" };
            }
        },
        {
            body: t.Object({
                user_id: t.String(),
            }),
            response: {
                200: t.Object({
                    data: t.Array(WorkoutSchema),
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
                const updatedWorkout = await workout_update(prisma, id, update_data);
                return { data: updatedWorkout };
            } catch (error) {
                console.error("Error updating workout:", error);
                set.status = 500;
                return { message: "Failed to update workout" };
            }
        },
        {
            body: WorkoutUpdateRequestSchema,
            response: {
                200: t.Object({
                    data: WorkoutSchema,
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
                const { workout_id } = body;
                await workout_delete(prisma, workout_id);
                return { message: "Workout deleted successfully" };
            } catch (error) {
                console.error("Error deleting workout:", error);
                set.status = 500;
                return { message: "Failed to delete workout" };
            }
        },
        {
            body: t.Object({
                workout_id: t.Number(),
            }),
            response: {
                200: t.Object({
                    message: t.String(),
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

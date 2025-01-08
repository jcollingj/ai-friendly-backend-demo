import { Static, Type as t } from "@sinclair/typebox";

// Schema for creating a new workout type. Only include fields that are required or optional for creation
export const WorkoutTypeCreateSchema = t.Object({
    type: t.String(),
    name: t.String(),
    user_id: t.String(),
});

// Schema for updating an existing workout type. Only include fields that can be updated
export const WorkoutTypeUpdateSchema = t.Object({
    type: t.Optional(t.String()),
    name: t.Optional(t.String()),
    deleted: t.Optional(t.Boolean()),
});

// Schema for the update request that includes both id and update data
export const WorkoutTypeUpdateRequestSchema = t.Object({
    id: t.Integer(),
    update_data: WorkoutTypeUpdateSchema,
});

// Schema for the complete workout type. Include all fields that exist in the model
export const WorkoutTypeSchema = t.Object({
    id: t.Integer(), // Change the id type to Integer to reflect BigInt
    created_at: t.String(),
    updated_at: t.String(),
    type: t.String(),
    name: t.String(),
    deleted: t.Boolean(),
    user_id: t.String(),
});

// Infer the types and then export them. Type definitions based on the schemas
export type WorkoutTypeCreate = Static<typeof WorkoutTypeCreateSchema>;
export type WorkoutTypeUpdate = Static<typeof WorkoutTypeUpdateSchema>;
export type WorkoutTypeUpdateRequest = Static<typeof WorkoutTypeUpdateRequestSchema>;
export type WorkoutType = Static<typeof WorkoutTypeSchema>;

// Schema for creating a new workout. Only include fields that are required or optional for creation
export const WorkoutCreateSchema = t.Object({
    workout_date: t.String(),
    workout_type_id: t.Integer(),
    user_id: t.String(),
    duration: t.Integer(),
});

// Schema for updating an existing workout. Only include fields that can be updated
export const WorkoutUpdateSchema = t.Object({
    workout_date: t.Optional(t.String()),
    workout_type_id: t.Optional(t.Integer()),
    duration: t.Optional(t.Integer()),
});

// Schema for the update request that includes both id and update data
export const WorkoutUpdateRequestSchema = t.Object({
    id: t.Integer(),
    update_data: WorkoutUpdateSchema,
});

// Schema for the complete workout. Include all fields that exist in the model
export const WorkoutSchema = t.Object({
    id: t.Integer(),
    created_at: t.String(),
    workout_date: t.String(),
    workout_type_id: t.Integer(),
    user_id: t.String(),
    duration: t.Integer(),
});

// Infer the types and then export them. Type definitions based on the schemas
export type WorkoutCreate = Static<typeof WorkoutCreateSchema>;
export type WorkoutUpdate = Static<typeof WorkoutUpdateSchema>;
export type WorkoutUpdateRequest = Static<typeof WorkoutUpdateRequestSchema>;
export type Workout = Static<typeof WorkoutSchema>;

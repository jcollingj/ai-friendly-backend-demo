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
export type WorkoutType = Static<typeof WorkoutTypeSchema>;

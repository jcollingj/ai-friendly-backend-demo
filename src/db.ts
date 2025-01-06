import { Prisma, PrismaClient } from "@prisma/client";
import { WorkoutTypeCreate, WorkoutTypeUpdate, WorkoutType } from "./types";
import type { workout_types } from "@prisma/client";

async function init_prisma() {
    const prisma = new PrismaClient({});
    return prisma;
}

export async function workout_type_create(prisma: PrismaClient, data: WorkoutTypeCreate): Promise<WorkoutType> {
    const newWorkoutType = await prisma.workout_types.create({
        data: {
            type: data.type,
            name: data.name,
            user_id: data.user_id,
        },
    });

    return {
        id: Number(newWorkoutType.id),
        created_at: newWorkoutType.created_at.toISOString(),
        updated_at: newWorkoutType.updated_at.toISOString(),
        type: newWorkoutType.type,
        name: newWorkoutType.name,
        deleted: newWorkoutType.deleted,
        user_id: newWorkoutType.user_id,
    };
}

export async function workout_type_get_by_id(prisma: PrismaClient, id: number): Promise<WorkoutType> {
    const workoutType = await prisma.workout_types.findUniqueOrThrow({
        where: { id: BigInt(id) },
    });

    return {
        id: Number(workoutType.id),
        created_at: workoutType.created_at.toISOString(),
        updated_at: workoutType.updated_at.toISOString(),
        type: workoutType.type,
        name: workoutType.name,
        deleted: workoutType.deleted,
        user_id: workoutType.user_id,
    };
}

export async function workout_type_update(
    prisma: PrismaClient,
    id: number,
    data: WorkoutTypeUpdate
): Promise<WorkoutType> {
    const updateData: Partial<WorkoutTypeUpdate> = {};
    if (data.type !== undefined) updateData.type = data.type;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.deleted !== undefined) updateData.deleted = data.deleted;

    const updatedWorkoutType = await prisma.workout_types.update({
        where: { id: BigInt(id) },
        data: updateData,
    });

    return {
        id: Number(updatedWorkoutType.id),
        created_at: updatedWorkoutType.created_at.toISOString(),
        updated_at: updatedWorkoutType.updated_at.toISOString(),
        type: updatedWorkoutType.type,
        name: updatedWorkoutType.name,
        deleted: updatedWorkoutType.deleted,
        user_id: updatedWorkoutType.user_id,
    };
}

export async function workout_type_delete(prisma: PrismaClient, id: number): Promise<WorkoutType> {
    const deletedWorkoutType = await prisma.workout_types.update({
        where: { id: BigInt(id) },
        data: { deleted: true },
    });

    return {
        id: Number(deletedWorkoutType.id),
        created_at: deletedWorkoutType.created_at.toISOString(),
        updated_at: deletedWorkoutType.updated_at.toISOString(),
        type: deletedWorkoutType.type,
        name: deletedWorkoutType.name,
        deleted: deletedWorkoutType.deleted,
        user_id: deletedWorkoutType.user_id,
    };
}

export async function workout_type_list_for_user_id(prisma: PrismaClient, user_id: string): Promise<WorkoutType[]> {
    const workoutTypes = await prisma.workout_types.findMany({
        where: {
            user_id: user_id,
            deleted: false,
        },
    });

    return workoutTypes.map((workoutType) => ({
        id: Number(workoutType.id),
        created_at: workoutType.created_at.toISOString(),
        updated_at: workoutType.updated_at.toISOString(),
        type: workoutType.type,
        name: workoutType.name,
        deleted: workoutType.deleted,
        user_id: workoutType.user_id,
    }));
}

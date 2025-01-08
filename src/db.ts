import { Prisma, PrismaClient } from "@prisma/client";
import { WorkoutTypeCreate, WorkoutTypeUpdate, WorkoutType, WorkoutCreate, WorkoutUpdate, Workout } from "./types";

export const prisma = new PrismaClient();

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

export async function workout_create(prisma: PrismaClient, data: WorkoutCreate): Promise<Workout> {
    const newWorkout = await prisma.workout.create({
        data: {
            workout_date: new Date(data.workout_date),
            workout_type_id: BigInt(data.workout_type_id),
            user_id: data.user_id,
            duration: BigInt(data.duration),
        },
    });

    return {
        id: Number(newWorkout.id),
        created_at: newWorkout.created_at.toISOString(),
        workout_date: newWorkout.workout_date.toISOString(),
        workout_type_id: Number(newWorkout.workout_type_id),
        user_id: newWorkout.user_id,
        duration: Number(newWorkout.duration),
    };
}

export async function workout_get_by_id(prisma: PrismaClient, id: number): Promise<Workout> {
    const workout = await prisma.workout.findUniqueOrThrow({
        where: { id: BigInt(id) },
    });

    return {
        id: Number(workout.id),
        created_at: workout.created_at.toISOString(),
        workout_date: workout.workout_date.toISOString(),
        workout_type_id: Number(workout.workout_type_id),
        user_id: workout.user_id,
        duration: Number(workout.duration),
    };
}

export async function workout_update(prisma: PrismaClient, id: number, data: WorkoutUpdate): Promise<Workout> {
    const updateData: any = {};
    if (data.workout_date !== undefined) updateData.workout_date = new Date(data.workout_date);
    if (data.workout_type_id !== undefined) updateData.workout_type_id = BigInt(data.workout_type_id);
    if (data.duration !== undefined) updateData.duration = BigInt(data.duration);

    const updatedWorkout = await prisma.workout.update({
        where: { id: BigInt(id) },
        data: updateData,
    });

    return {
        id: Number(updatedWorkout.id),
        created_at: updatedWorkout.created_at.toISOString(),
        workout_date: updatedWorkout.workout_date.toISOString(),
        workout_type_id: Number(updatedWorkout.workout_type_id),
        user_id: updatedWorkout.user_id,
        duration: Number(updatedWorkout.duration),
    };
}

export async function workout_delete(prisma: PrismaClient, id: number): Promise<void> {
    await prisma.workout.delete({
        where: { id: BigInt(id) },
    });
}

export async function workout_list_for_user_id(prisma: PrismaClient, user_id: string): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany({
        where: { user_id },
    });

    return workouts.map((workout) => ({
        id: Number(workout.id),
        created_at: workout.created_at.toISOString(),
        workout_date: workout.workout_date.toISOString(),
        workout_type_id: Number(workout.workout_type_id),
        user_id: workout.user_id,
        duration: Number(workout.duration),
    }));
}

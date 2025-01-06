# Database Function Templates
Type the data param with Typebox requested by the user. Always convert the returned data to match the Typebox schema. Functions should return the formatted object, and let Prisma handle error throwing. If there's an ID that's a BigInt in the Prisma schema or in the typing, wrap it in `Number()` when returning the data to ensure it matches the Typebox schema.

## Base Template
```typescript
export async function item_action(
    prisma: PrismaClient, 
    ...params: CreateItemSchema[]
): Promise<Item> {
    // Execute DB Logic here
    
    // Format and return the data according to schema
    return formattedItem;
}
```

## Create Example

```typescript
export async function item_create(
    prisma: PrismaClient,
    data: CreateItem
): Promise<Item> {
    const newItem = await prisma.items.create({
        data: {
            title: data.title ?? null,
            description: data.description ?? null,
            required_field: data.required_field,
        },
    });

    return {
        id: newItem.id,
        created_at: newItem.created_at.toISOString(),
        updated_at: newItem.updated_at.toISOString(),
        title: newItem.title ?? "",
        description: newItem.description ?? "",
        required_field: newItem.required_field,
    };
}
```

## Update Example

```typescript
export async function item_update(
    prisma: PrismaClient,
    id: string, 
    data: ItemUpdate
): Promise<Item> {
    const updateData: Partial<ItemUpdate> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.required_field !== undefined) updateData.required_field = data.required_field;
    if (data.deleted !== undefined) updateData.deleted = data.deleted;

    const updatedItem = await prisma.items.update({
        where: { id },
        data: updateData,
    });

    return {
        id: updatedItem.id,
        created_at: updatedItem.created_at.toISOString(),
        updated_at: updatedItem.updated_at.toISOString(),
        title: updatedItem.title ?? "",
        description: updatedItem.description ?? "",
        required_field: updatedItem.required_field,
        deleted: updatedItem.deleted,
    };
}
```

## Delete Example

```typescript
export async function item_delete(
    prisma: PrismaClient,
    id: string
): Promise<Item> {
    const deletedItem = await prisma.items.update({
        where: { id },
        data: { deleted: true }
    });

    return {
        id: deletedItem.id,
        created_at: deletedItem.created_at.toISOString(),
        updated_at: deletedItem.updated_at.toISOString(),
        title: deletedItem.title ?? "",
        description: deletedItem.description ?? "",
        required_field: deletedItem.required_field,
        deleted: deletedItem.deleted,
    };
}
```

## List For User Example

```typescript
export async function item_list_for_user_id(
    prisma: PrismaClient,
    user_id: string
): Promise<Item[]> {
    const items = await prisma.items.findMany({
        where: { 
            owner_id: user_id,
            deleted: false
        }
    });

    return items.map(item => ({
        id: item.id,
        created_at: item.created_at.toISOString(),
        updated_at: item.updated_at.toISOString(),
        title: item.title ?? "",
        description: item.description ?? "",
        required_field: item.required_field,
        deleted: item.deleted,
    }));
}
```

## Required Functions for Each Item

- `[item]_create`
- `[item]_get_by_id` 
- `[item]_update`
- `[item]_delete` (set deleted to true)
- `[item]_list_for_user_id` (filter where deleted is false)

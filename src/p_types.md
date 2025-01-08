# TypeBox Schema Template

This template shows how to create TypeBox types based on the attached Prisma Schema.
When creating new types, follow these steps:

1. Create the base Schema with all fields
2. Create a CreateSchema for required/optional creation fields  
3. Create an UpdateSchema for updatable fields
4. Define and export corresponding types

Example schemas and types:

```typescript
// Schema for creating a new item. Only include fields that are required or optional for creation
export const ItemCreateSchema = t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()), 
    required_field: t.String(),
    
});

// Schema for updating an existing item. Only include fields that can be updated
export const ItemUpdateSchema = t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    required_field: t.Optional(t.String()),
});

// Schema for the update request that includes both id and update data
export const ItemUpdateRequestSchema = t.Object({
    id: t.String(),
    update_data: ItemUpdateSchema,
});

// Schema for the complete item. Include all fields that exist in the model
export const ItemSchema = t.Object({
    id: t.String(), // Make sure the id typing matches the Prisma schema correctly.
    created_at: t.String(),
    updated_at: t.String(),
    title: t.String(),
    description: t.String(), 
    required_field: t.String(),
});

// Infer the types and then export them. Type definitions based on the schemas
export type ItemCreate = Static<typeof ItemCreateSchema>;
export type ItemUpdate = Static<typeof ItemUpdateSchema>;
export type ItemUpdateRequest = Static<typeof ItemUpdateRequestSchema>;
export type Item = Static<typeof ItemSchema>;
```


## Additional Notes:
There will likely be types like:
`import type { item } from "@prisma/client";`
Reexport those from the new type files as well.
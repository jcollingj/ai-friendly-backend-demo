# Creating Endpoints
Below is an example of how to create the endpoints for an object called `items`.

Your job is to take this example and apply it to the request from the user.
You should receive the types and db functions for that object. Use the typebox types for the body of the request and for returning the response. 

```typescript
import { Elysia, t } from "elysia";
import { ListItemsByUserSchema, ItemCreateSchema, ItemSchema, ItemUpdateRequestSchema } from "../types/index";
import { item_update, item_create, item_get_by_id, item_list_for_user_id, item_delete } from "../db/db";
import { PrismaClient } from "@prisma/client";

type AppContext = {
   store: {
       prisma: PrismaClient;
   };
};

export const item_routes = new Elysia({ prefix: "/items" })
   .use((app) => app.decorate("store", { prisma: new PrismaClient() }))
   .derive(({ store }): AppContext => ({ store }))
   .post(
       "/",
       async ({ body, store: { prisma }, set }) => {
           try {
               const item = await item_create(prisma, body);
               return { data: item };
           } catch (error) {
               console.error("Error creating item:", error);
               set.status = 500;
               return { message: "Failed to create item" };
           }
       },
       {
           body: ItemCreateSchema,
           response: {
               200: t.Object({
                   data: ItemSchema,
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
               const { item_id } = body;
               const item = await item_get_by_id(prisma, item_id);
               return { data: item };
           } catch (error) {
               console.error("Error retrieving item:", error);
               set.status = 500;
               return { message: "Failed to retrieve item" };
           }
       },
       {
           body: t.Object({
               item_id: t.String(),
           }),
           response: {
               200: t.Object({
                   data: ItemSchema,
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
               const items = await item_list_for_user_id(prisma, user_id);
               return { data: items };
           } catch (error) {
               console.error("Error listing items:", error);
               set.status = 500;
               return { message: "Failed to list items" };
           }
       },
       {
           body: ListItemsByUserSchema,
           response: {
               200: t.Object({
                   data: t.Array(ItemSchema),
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
               const { id, data } = body;
               const updatedItem = await item_update(prisma, id, data);
               return { data: updatedItem };
           } catch (error) {
               console.error("Error updating item:", error);
               set.status = 500;
               return { message: "Failed to update item" };
           }
       },
       {
           body: ItemUpdateRequestSchema,
           response: {
               200: t.Object({
                   data: ItemSchema,
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
               const { item_id } = body;
               const deletedItem = await item_delete(prisma, item_id);
               return { data: deletedItem };
           } catch (error) {
               console.error("Error deleting item:", error);
               set.status = 500;
               return { message: "Failed to delete item" };
           }
       },
       {
           body: t.Object({
               item_id: t.String(),
           }),
           response: {
               200: t.Object({
                   data: ItemSchema,
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
```
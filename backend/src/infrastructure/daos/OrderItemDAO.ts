import { db } from "../database/connection";
import { orderItem } from "../database/schema";
import { eq } from "drizzle-orm";

export class OrderItemDAO {
    async create(data: any) {
        const [row] = await db.insert(orderItem).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(orderItem).where(eq(orderItem.orderItemId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(orderItem).set(data).where(eq(orderItem.orderItemId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(orderItem).where(eq(orderItem.orderItemId, id)).returning({ id: orderItem.orderItemId });
        return result.length > 0;
    }
}

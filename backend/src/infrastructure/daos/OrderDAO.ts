import { db } from "../database/connection";
import { orders } from "../database/schema";
import { eq } from "drizzle-orm";

export class OrderDAO {
    async create(data: any) {
        const [row] = await db.insert(orders).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(orders).where(eq(orders.orderId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(orders).set(data).where(eq(orders.orderId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(orders).where(eq(orders.orderId, id)).returning({ id: orders.orderId });
        return result.length > 0;
    }
}

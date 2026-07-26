import { db } from "../database/connection";
import { delivery } from "../database/schema";
import { eq } from "drizzle-orm";

export class DeliveryDAO {
    async create(data: any) {
        const [row] = await db.insert(delivery).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(delivery).where(eq(delivery.deliveryId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(delivery).set(data).where(eq(delivery.deliveryId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(delivery).where(eq(delivery.deliveryId, id)).returning({ id: delivery.deliveryId });
        return result.length > 0;
    }
}

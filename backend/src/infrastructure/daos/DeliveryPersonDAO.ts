import { db } from "../database/connection";
import { deliveryPerson } from "../database/schema";
import { eq } from "drizzle-orm";

export class DeliveryPersonDAO {
    async create(data: any) {
        const [row] = await db.insert(deliveryPerson).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(deliveryPerson).where(eq(deliveryPerson.deliveryPersonId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(deliveryPerson).set(data).where(eq(deliveryPerson.deliveryPersonId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(deliveryPerson).where(eq(deliveryPerson.deliveryPersonId, id)).returning({ id: deliveryPerson.deliveryPersonId });
        return result.length > 0;
    }
}

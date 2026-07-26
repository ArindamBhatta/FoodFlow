import { db } from "../database/connection";
import { customer } from "../database/schema";
import { eq } from "drizzle-orm";

export class CustomerDAO {
    async create(data: any) {
        const [row] = await db.insert(customer).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(customer).where(eq(customer.customerId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(customer).set(data).where(eq(customer.customerId, id)).returning();
        return row;
    }

    async getByPersonId(personId: number) {
        const [row] = await db.select().from(customer).where(eq(customer.personId, personId)).limit(1);
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(customer).where(eq(customer.customerId, id)).returning({ id: customer.customerId });
        return result.length > 0;
    }
}

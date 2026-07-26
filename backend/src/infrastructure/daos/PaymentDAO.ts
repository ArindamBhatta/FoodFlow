import { db } from "../database/connection";
import { payment } from "../database/schema";
import { eq } from "drizzle-orm";

export class PaymentDAO {
    async create(data: any) {
        const [row] = await db.insert(payment).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(payment).where(eq(payment.paymentId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(payment).set(data).where(eq(payment.paymentId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(payment).where(eq(payment.paymentId, id)).returning({ id: payment.paymentId });
        return result.length > 0;
    }
}

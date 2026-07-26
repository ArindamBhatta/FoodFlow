import { db } from "../database/connection";
import { couponUsage } from "../database/schema";
import { eq } from "drizzle-orm";

export class CouponUsageDAO {
    async create(data: any) {
        const [row] = await db.insert(couponUsage).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(couponUsage).where(eq(couponUsage.usageId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(couponUsage).set(data).where(eq(couponUsage.usageId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(couponUsage).where(eq(couponUsage.usageId, id)).returning({ id: couponUsage.usageId });
        return result.length > 0;
    }
}

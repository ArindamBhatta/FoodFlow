import { db } from "../database/connection";
import { coupon } from "../database/schema";
import { eq } from "drizzle-orm";

export class CouponDAO {
    async create(data: any) {
        const [row] = await db.insert(coupon).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(coupon).where(eq(coupon.couponId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(coupon).set(data).where(eq(coupon.couponId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(coupon).where(eq(coupon.couponId, id)).returning({ id: coupon.couponId });
        return result.length > 0;
    }
}

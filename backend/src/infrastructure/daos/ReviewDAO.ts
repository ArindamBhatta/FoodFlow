import { db } from "../database/connection";
import { review } from "../database/schema";
import { eq } from "drizzle-orm";

export class ReviewDAO {
    async create(data: any) {
        const [row] = await db.insert(review).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(review).where(eq(review.reviewId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(review).set(data).where(eq(review.reviewId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(review).where(eq(review.reviewId, id)).returning({ id: review.reviewId });
        return result.length > 0;
    }
}

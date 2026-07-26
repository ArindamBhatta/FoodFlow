import { db } from "../database/connection";
import { foodCategory } from "../database/schema";
import { eq } from "drizzle-orm";

export class FoodCategoryDAO {
    async create(data: any) {
        const [row] = await db.insert(foodCategory).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(foodCategory).where(eq(foodCategory.categoryId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(foodCategory).set(data).where(eq(foodCategory.categoryId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(foodCategory).where(eq(foodCategory.categoryId, id)).returning({ id: foodCategory.categoryId });
        return result.length > 0;
    }
}

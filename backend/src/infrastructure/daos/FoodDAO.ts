import { db } from "../database/connection";
import { food } from "../database/schema";
import { eq } from "drizzle-orm";

export class FoodDAO {
    async create(data: any) {
        const [row] = await db.insert(food).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(food).where(eq(food.foodId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(food).set(data).where(eq(food.foodId, id)).returning();
        return row;
    }

    async getByVendorId(vendorId: number) {
        return await db.select().from(food).where(eq(food.vendorId, vendorId));
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(food).where(eq(food.foodId, id)).returning({ id: food.foodId });
        return result.length > 0;
    }
}

import { db } from "../database/connection";
import { customerFavorite } from "../database/schema";
import { eq } from "drizzle-orm";

export class CustomerFavoriteDAO {
    async create(data: any) {
        const [row] = await db.insert(customerFavorite).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(customerFavorite).where(eq(customerFavorite.favoriteId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(customerFavorite).set(data).where(eq(customerFavorite.favoriteId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(customerFavorite).where(eq(customerFavorite.favoriteId, id)).returning({ id: customerFavorite.favoriteId });
        return result.length > 0;
    }
}

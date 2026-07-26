import { db } from "../database/connection";
import { cartItem } from "../database/schema";
import { eq, and } from "drizzle-orm";

export class CartItemDAO {
    async create(data: any) {
        const [row] = await db.insert(cartItem).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(cartItem).where(eq(cartItem.cartItemId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(cartItem).set(data).where(eq(cartItem.cartItemId, id)).returning();
        return row;
    }

    async getByCartId(cartId: number) {
        return await db.select().from(cartItem).where(eq(cartItem.cartId, cartId));
    }

    async getByCartIdAndFoodId(cartId: number, foodId: number) {
        const [row] = await db
            .select()
            .from(cartItem)
            .where(and(eq(cartItem.cartId, cartId), eq(cartItem.foodId, foodId)))
            .limit(1);
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(cartItem).where(eq(cartItem.cartItemId, id)).returning({ id: cartItem.cartItemId });
        return result.length > 0;
    }
}

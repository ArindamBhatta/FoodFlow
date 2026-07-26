import { db } from "../database/connection";
import { cart } from "../database/schema";
import { eq } from "drizzle-orm";

export class CartDAO {
    async create(data: any) {
        const [row] = await db.insert(cart).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(cart).where(eq(cart.cartId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(cart).set(data).where(eq(cart.cartId, id)).returning();
        return row;
    }

    async getByCustomerId(customerId: number) {
        const [row] = await db.select().from(cart).where(eq(cart.customerId, customerId)).limit(1);
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(cart).where(eq(cart.cartId, id)).returning({ id: cart.cartId });
        return result.length > 0;
    }
}

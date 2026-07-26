import { db } from "../database/connection";
import { address } from "../database/schema";
import { eq } from "drizzle-orm";

export class AddressDAO {
    async create(data: any) {
        const [row] = await db.insert(address).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(address).where(eq(address.addressId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(address).set(data).where(eq(address.addressId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(address).where(eq(address.addressId, id)).returning({ id: address.addressId });
        return result.length > 0;
    }
}

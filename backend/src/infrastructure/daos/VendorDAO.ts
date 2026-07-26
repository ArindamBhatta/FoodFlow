import { db } from "../database/connection";
import { vendor } from "../database/schema";
import { eq } from "drizzle-orm";

export class VendorDAO {
    async create(data: any) {
        const [row] = await db.insert(vendor).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(vendor).where(eq(vendor.vendorId, id)).limit(1);
        return row;
    }

    async getByPersonId(personId: number) {
        const [row] = await db.select().from(vendor).where(eq(vendor.personId, personId)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(vendor).set(data).where(eq(vendor.vendorId, id)).returning();
        return row;
    }

    async getAll() {
        return await db.select().from(vendor);
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(vendor).where(eq(vendor.vendorId, id)).returning({ id: vendor.vendorId });
        return result.length > 0;
    }
}

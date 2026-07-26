import { db } from '../database/connection';
import { admin } from '../database/schema';
import { eq } from 'drizzle-orm';

export class AdminDAO {
    async create(data: any) {
        const result = await db.insert(admin).values(data).returning();
        return result[0];
    }

    async getById(adminId: number) {
        const result = await db.select().from(admin).where(eq(admin.adminId, adminId));
        return result[0];
    }

    async getByPersonId(personId: number) {
        const result = await db.select().from(admin).where(eq(admin.personId, personId));
        return result[0];
    }

    async update(adminId: number, data: any) {
        const result = await db.update(admin).set(data).where(eq(admin.adminId, adminId)).returning();
        return result[0];
    }

    async delete(adminId: number) {
        await db.delete(admin).where(eq(admin.adminId, adminId));
    }
}

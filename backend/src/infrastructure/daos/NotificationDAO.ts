import { db } from "../database/connection";
import { notification } from "../database/schema";
import { eq } from "drizzle-orm";

export class NotificationDAO {
    async create(data: any) {
        const [row] = await db.insert(notification).values(data).returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db.select().from(notification).where(eq(notification.notificationId, id)).limit(1);
        return row;
    }

    async update(id: number, data: any) {
        const [row] = await db.update(notification).set(data).where(eq(notification.notificationId, id)).returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db.delete(notification).where(eq(notification.notificationId, id)).returning({ id: notification.notificationId });
        return result.length > 0;
    }
}

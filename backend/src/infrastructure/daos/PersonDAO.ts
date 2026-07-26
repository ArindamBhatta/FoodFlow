import { db } from "../database/connection";
import { person } from "../database/schema";
import { eq } from "drizzle-orm";

export class PersonDAO {
    async create(data: any) {
        const [row] = await db
            .insert(person)
            .values(data)
            .returning();
        return row;
    }

    async getById(id: number) {
        const [row] = await db
            .select()
            .from(person)
            .where(eq(person.personId, id))
            .limit(1);
        return row;
    }

    async getByEmail(email: string) {
        const [row] = await db
            .select()
            .from(person)
            .where(eq(person.email, email))
            .limit(1);
        return row;
    }

    async update(id: number, personData: any) {
        const [row] = await db
            .update(person)
            .set(personData)
            .where(eq(person.personId, id))
            .returning();
        return row;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db
            .delete(person)
            .where(eq(person.personId, id))
            .returning({ deletedId: person.personId });

        return result.length > 0;
    }
}

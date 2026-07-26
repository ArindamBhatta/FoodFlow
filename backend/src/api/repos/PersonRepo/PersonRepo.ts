import { PersonDAO } from "../../../infrastructure/daos/PersonDAO";
import PersonEntity from "../../entity/PersonEntity";
import IPersonRepo from "./PersonRepo.interface";

export default class PersonRepo implements IPersonRepo {
    private dao: PersonDAO;

    constructor(dao: PersonDAO) {
        this.dao = dao;
    }

    async create(person: PersonEntity): Promise<PersonEntity> {
        const rawData = person.toRow();
        const savedRow = await this.dao.create(rawData);
        return PersonEntity.fromRow(savedRow);
    }

    async getById(id: number): Promise<PersonEntity | null> {
        const row = await this.dao.getById(id);
        return row ? PersonEntity.fromRow(row) : null;
    }

    async findByEmail(email: string): Promise<PersonEntity | null> {
        const row = await this.dao.getByEmail(email);
        return row ? PersonEntity.fromRow(row) : null;
    }

    async update(id: number, data: any): Promise<PersonEntity | null> {
        const row = await this.dao.update(id, data);
        return row ? PersonEntity.fromRow(row) : null;
    }

    async delete(id: number): Promise<boolean> {
        return await this.dao.delete(id);
    }
}

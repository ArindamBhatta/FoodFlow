import PersonEntity from "../../entity/PersonEntity";

export default interface IPersonRepo {
    create(person: PersonEntity): Promise<PersonEntity>;
    getById(id: number): Promise<PersonEntity | null>;
    findByEmail(email: string): Promise<PersonEntity | null>;
    update(id: number, data: any): Promise<PersonEntity | null>;
    delete(id: number): Promise<boolean>;
}

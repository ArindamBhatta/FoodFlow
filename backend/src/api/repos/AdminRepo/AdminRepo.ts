import { PersonDAO } from "../../../infrastructure/daos/PersonDAO";
import { AdminDAO } from "../../../infrastructure/daos/AdminDAO";
import AdminEntity from "../../entity/AdminEntity";
import IAdminRepo from "./AdminRepo.interface";
import logger from "../../../infrastructure/logger/winston";

export default class AdminRepo implements IAdminRepo {
  private personDao: PersonDAO;
  private adminDao: AdminDAO;

  constructor(personDao: PersonDAO, adminDao: AdminDAO) {
    this.personDao = personDao;
    this.adminDao = adminDao;
  }

  createAdmin = async (adminEntity: AdminEntity): Promise<AdminEntity> => {
    try {
      const rawData = adminEntity.toRow();
      const savedRow = await this.adminDao.create(rawData);
      return AdminEntity.fromRow(savedRow);
    } catch (error) {
      logger.error("Error in AdminRepo.createAdmin:", error);
      throw error;
    }
  };


  findAdmin = async ({ adminId, email }: { adminId?: number; email?: string }): Promise<AdminEntity | null> => {
    try {
      let adminRow = null;
      let personRow = null;

      if (email) {
        personRow = await this.personDao.getByEmail(email);
        if (personRow) {
          adminRow = await this.adminDao.getByPersonId(personRow.personId);
        }
      } else if (adminId) {
        adminRow = await this.adminDao.getById(adminId);
        if (adminRow && adminRow.personId) {
          personRow = await this.personDao.getById(adminRow.personId);
        }
      }

      if (!adminRow || !personRow) return null;

      return new AdminEntity({
        adminId: adminRow.adminId,
        personId: adminRow.personId as number,
        role: adminRow.role || 'admin',
        isActive: adminRow.isActive ?? true,
        fullName: personRow.fullName,
        email: personRow.email,
        phoneNumber: personRow.phoneNumber,
        password: personRow.password,
        salt: personRow.salt,
      });
    } catch (error) {
      logger.error("Error in AdminRepo.findAdmin:", error);
      throw error;
    }
  };


}

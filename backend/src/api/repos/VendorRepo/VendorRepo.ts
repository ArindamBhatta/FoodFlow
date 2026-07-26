import { VendorDAO } from "../../../infrastructure/daos/VendorDAO";
import { PersonDAO } from "../../../infrastructure/daos/PersonDAO";
import VendorEntity from "../../entity/VendorEntity";
import IVendorRepo from "./VendorRepo.interface";

export default class VendorRepo implements IVendorRepo {
  private vendorDao: VendorDAO;
  private personDao: PersonDAO;

  constructor(vendorDao: VendorDAO, personDao: PersonDAO) {
    this.vendorDao = vendorDao;
    this.personDao = personDao;
  }

  create = async (vendor: VendorEntity): Promise<VendorEntity> => {
    try {
      const rawData = vendor.toRow();
      const savedRow = await this.vendorDao.create(rawData);
      return VendorEntity.fromRow(savedRow);
    } catch (error) {
      console.error("Error in VendorRepo.create:", error);
      throw error;
    }
  };

  findVendor = async ({
    vendorId,
    email,
  }: {
    vendorId?: number;
    email?: string;
  }): Promise<VendorEntity | null> => {
    try {
      let vendorRow = null;
      let personRow = null;

      if (email) {
        personRow = await this.personDao.getByEmail(email);
        if (personRow) {
          vendorRow = await this.vendorDao.getByPersonId(personRow.personId);
        }
      } else if (vendorId) {
        vendorRow = await this.vendorDao.getById(vendorId);
        if (vendorRow && vendorRow.personId) {
          personRow = await this.personDao.getById(vendorRow.personId);
        }
      }

      if (!vendorRow || !personRow) return null;

      return new VendorEntity({
        ...vendorRow,
        ownerName: personRow.fullName,
        ownerEmail: personRow.email,
        ownerPhone: personRow.phoneNumber,
        password: personRow.password,
        salt: personRow.salt,
        accessToken: personRow.accessToken,
        refreshToken: personRow.refreshToken,
        verified: personRow.verified ?? false,
      });
    } catch (error) {
      console.error("Error in VendorRepo.findVendor:", error);
      throw error;
    }
  };

  updateRefreshToken = async (
    vendorId: number,
    refreshToken: string
  ): Promise<void> => {
    try {
      const vendorRow = await this.vendorDao.getById(vendorId);
      if (vendorRow && vendorRow.personId) {
        await this.personDao.update(vendorRow.personId, { refreshToken });
      }
    } catch (error) {
      console.error("Error in VendorRepo.updateRefreshToken:", error);
      throw error;
    }
  };

  updateOwnerProfile = async (
    vendorId: number,
    updateData: any
  ): Promise<VendorEntity | null> => {
    try {
      const vendorRow = await this.vendorDao.getById(vendorId);
      if (!vendorRow || !vendorRow.personId) return null;

      if (updateData.ownerName || updateData.ownerEmail || updateData.ownerPhone) {
        await this.personDao.update(vendorRow.personId, {
          fullName: updateData.ownerName,
          email: updateData.ownerEmail,
          phoneNumber: updateData.ownerPhone
        });
      }

      const updatedVendorRow = await this.vendorDao.update(vendorId, updateData);
      const personRow = await this.personDao.getById(vendorRow.personId);

      return new VendorEntity({
        ...updatedVendorRow,
        ownerName: personRow.fullName,
        ownerEmail: personRow.email,
        ownerPhone: personRow.phoneNumber,
        verified: personRow.verified ?? false
      });
    } catch (error) {
      console.error("Error in VendorRepo.updateOwnerProfile:", error);
      throw error;
    }
  };

  updateShopImage = async (
    vendorId: number,
    imageUrl: string
  ): Promise<VendorEntity | null> => {
    try {
      const row = await this.vendorDao.getById(vendorId);
      if (!row) throw new Error("Vendor not found");

      let coverImages = row.coverImages ? JSON.parse(row.coverImages) : [];
      coverImages.push(imageUrl);

      const updatedRow = await this.vendorDao.update(vendorId, { coverImages: JSON.stringify(coverImages) });

      const personRow = row.personId ? await this.personDao.getById(row.personId) : null;

      return new VendorEntity({
        ...updatedRow,
        ownerName: personRow?.fullName,
        ownerEmail: personRow?.email,
        ownerPhone: personRow?.phoneNumber,
        verified: personRow?.verified ?? false
      });
    } catch (error) {
      console.error("Error in VendorRepo.updateShopImage:", error);
      throw error;
    }
  };



  getAll = async (): Promise<VendorEntity[]> => {
    try {
      const vendors = await this.vendorDao.getAll();
      const results: VendorEntity[] = [];

      for (const v of vendors) {
        let personRow = null;
        if (v.personId) {
          personRow = await this.personDao.getById(v.personId);
        }
        results.push(new VendorEntity({
          ...v,
          ownerName: personRow?.fullName,
          ownerEmail: personRow?.email,
          ownerPhone: personRow?.phoneNumber,
          verified: personRow?.verified ?? false
        }));
      }
      return results;
    } catch (error) {
      console.error("Error in VendorRepo.getAll:", error);
      throw error;
    }
  };

  getById = async (vendorId: number): Promise<VendorEntity | null> => {
    try {
      const row = await this.vendorDao.getById(vendorId);
      if (!row) return null;

      const personRow = row.personId ? await this.personDao.getById(row.personId) : null;

      return new VendorEntity({
        ...row,
        ownerName: personRow?.fullName,
        ownerEmail: personRow?.email,
        ownerPhone: personRow?.phoneNumber,
        verified: personRow?.verified ?? false
      });
    } catch (error) {
      console.error(`Error in VendorRepo.getById for ID ${vendorId}:`, error);
      throw error;
    }
  };
}

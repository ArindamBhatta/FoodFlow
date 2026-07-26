import VendorEntity from "../../entity/VendorEntity";
import PersonEntity from "../../entity/PersonEntity";
import AdminEntity from "../../entity/AdminEntity";
import IAdminService from "./AdminService.interface";
import { generateAccessToken, generateSalt, hashPassword, verifyPassword } from "../../utils/auth.utility";
import logger from "../../../infrastructure/logger/winston";
import { CreateVendorDTO } from "../../dto/interface/Vendor.dto";
import { CreateAdminDTO, LoginAdminDTO } from "../../dto/interface/Admin.dto";
import IAdminRepo from "../../repos/AdminRepo/AdminRepo.interface";
import IPersonRepo from "../../repos/PersonRepo/PersonRepo.interface";
import IVendorRepo from "../../repos/VendorRepo/VendorRepo.interface";

export default class AdminService implements IAdminService {
  private adminRepo: IAdminRepo;
  private personRepo: IPersonRepo;
  private vendorRepo: IVendorRepo;

  constructor(adminRepo: IAdminRepo, personRepo: IPersonRepo, vendorRepo: IVendorRepo) {
    this.adminRepo = adminRepo;
    this.personRepo = personRepo;
    this.vendorRepo = vendorRepo;
  }

  adminSignUp = async (adminDto: CreateAdminDTO): Promise<{ admin: AdminEntity; signature: string }> => {
    try {
      const salt = await generateSalt();
      const hashedPassword = await hashPassword(adminDto.password, salt);

      const person = new PersonEntity({
        fullName: adminDto.fullName,
        email: adminDto.email,
        phoneNumber: adminDto.phoneNumber,
        password: hashedPassword,
        salt: salt,
        verified: true,
      });

      const savedPerson = await this.personRepo.create(person);

      const admin = new AdminEntity({
        personId: savedPerson.personId!,
        role: "admin",
      });
      const savedAdmin = await this.adminRepo.createAdmin(admin);

      const resultAdmin = new AdminEntity({
        ...savedAdmin.toRow(),
        adminId: savedAdmin.adminId,
        fullName: savedPerson.fullName,
        email: savedPerson.email,
        phoneNumber: savedPerson.phoneNumber,
      });

      const signature = generateAccessToken({
        _id: savedAdmin.adminId!.toString(),
        email: savedPerson.email,
        verified: true,
        role: "admin",
      });

      return { admin: resultAdmin, signature };
    } catch (error) {
      console.error("Error in AdminService.adminSignUp:", error);
      throw error;
    }
  };

  adminLogin = async (loginDto: LoginAdminDTO): Promise<{ admin: AdminEntity; signature: string }> => {
    try {
      const admin = await this.adminRepo.findAdmin({ email: loginDto.email });
      if (!admin) throw new Error("Admin not found");

      const isMatch = await verifyPassword(loginDto.password, admin.password!, admin.salt!);
      if (!isMatch) throw new Error("Invalid password");

      const signature = generateAccessToken({
        _id: admin.adminId!.toString(),
        email: admin.email!,
        verified: true,
        role: "admin",
      });

      return { admin, signature };
    } catch (error) {
      console.error("Error in AdminService.adminLogin:", error);
      throw error;
    }
  };


  createVendor = async (vendorDto: CreateVendorDTO): Promise<VendorEntity> => {
    try {
      // Step 1: Create Person first
      const salt = await generateSalt();
      const hashedPassword = await hashPassword(vendorDto.password, salt);

      const person = new PersonEntity({
        fullName: vendorDto.ownerName,
        email: vendorDto.email,
        phoneNumber: vendorDto.phone,
        password: hashedPassword,
        salt: salt,
        verified: true,
      });

      const savedPerson: PersonEntity = await this.personRepo.create(person);

      // Step 2: Create Vendor linked to Person
      const vendor = new VendorEntity({
        personId: savedPerson.personId!,
        vendorName: vendorDto.name,
        isActive: true,
      });

      const savedVendor: VendorEntity = await this.vendorRepo.create(vendor); //call Vendor repo 

      return new VendorEntity({
        ...savedVendor.toRow(),
        vendorId: savedVendor.vendorId,
        ownerName: savedPerson.fullName,
        ownerEmail: savedPerson.email,
        ownerPhone: savedPerson.phoneNumber,
        verified: savedPerson.verified
      });
    } catch (error) {
      console.error("Error in AdminService.createVendor:", error);
      throw error;
    }
  };

  getAllVendor = async (): Promise<VendorEntity[]> => {
    try {
      return await this.vendorRepo.getAll();
    } catch (error) {
      logger.error("Error in AdminService.getAllVendor:", error);
      throw error;
    }
  };

  getVendorByID = async (vendorId: number): Promise<VendorEntity | null> => {
    try {
      return await this.vendorRepo.getById(vendorId);
    } catch (error) {
      logger.error(`Error in AdminService.getVendorByID for ID ${vendorId}:`, error);
      throw error;
    }
  };
}

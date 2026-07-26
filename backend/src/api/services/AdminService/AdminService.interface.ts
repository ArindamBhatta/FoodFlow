import VendorEntity from "../../entity/VendorEntity";
import AdminEntity from "../../entity/AdminEntity";
import { CreateVendorDTO } from "../../dto/interface/Vendor.dto";
import { CreateAdminDTO, LoginAdminDTO } from "../../dto/interface/Admin.dto";

export default interface IAdminService {
  createVendor(vendorDto: CreateVendorDTO): Promise<VendorEntity>;
  getVendorByID(vendorId: number): Promise<VendorEntity | null>;
  getAllVendor(): Promise<VendorEntity[]>;
  adminSignUp(adminDto: CreateAdminDTO): Promise<{ admin: AdminEntity; signature: string }>;
  adminLogin(loginDto: LoginAdminDTO): Promise<{ admin: AdminEntity; signature: string }>;
}

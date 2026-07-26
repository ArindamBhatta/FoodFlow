import AdminEntity from "../../entity/AdminEntity";
import VendorEntity from "../../entity/VendorEntity";

export default interface IAdminRepo {
  findAdmin(query: { adminId?: number; email?: string }): Promise<AdminEntity | null>;
  createAdmin(admin: AdminEntity): Promise<AdminEntity>;
}

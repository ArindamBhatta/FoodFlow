import VendorEntity from "../../entity/VendorEntity";
import { LoginVendorDTO } from "../../dto/interface/Vendor.dto";

export default interface IVendorService {
  vendorLogin(loginVendor: LoginVendorDTO): Promise<LoginResponse>;
  vendorProfile(vendorId: number): Promise<VendorEntity | null>;
  updateVendorProfile(vendorId: number, updateData: any): Promise<VendorEntity | null>;
  updateShopImage(vendorId: number, file: any): Promise<VendorEntity | null>;
}

export interface LoginResponse {
  vendor: VendorEntity;
  accessToken: string;
  refreshToken: string;
}

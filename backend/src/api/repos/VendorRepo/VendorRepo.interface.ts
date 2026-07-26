import VendorEntity from "../../entity/VendorEntity";

export default interface IVendorRepo {
  findVendor(params: {
    vendorId?: number;
    email?: string;
  }): Promise<VendorEntity | null>;
  updateRefreshToken(vendorId: number, refreshToken: string): Promise<void>;
  updateOwnerProfile(vendorId: number, updateData: any): Promise<VendorEntity | null>;
  updateShopImage(vendorId: number, imageUrl: string): Promise<VendorEntity | null>;
  create(vendor: VendorEntity): Promise<VendorEntity>;
  getAll(): Promise<VendorEntity[]>;
  getById(vendorId: number): Promise<VendorEntity | null>;
}

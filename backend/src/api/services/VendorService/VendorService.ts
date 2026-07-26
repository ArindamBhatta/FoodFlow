import VendorEntity from "../../entity/VendorEntity";
import IVendorService, { LoginResponse } from "./VendorService.interface";
import VendorRepo from "../../repos/VendorRepo/VendorRepo";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyPassword
} from "../../utils/auth.utility";
import {
  EditVendorProfileDTO,
  LoginVendorDTO,
  VendorPayload,
} from "../../dto/interface/Vendor.dto";
import IVendorRepo from "../../repos/VendorRepo/VendorRepo.interface";

export default class VendorService implements IVendorService {
  private vendorRepo: IVendorRepo;

  constructor(vendorRepo: IVendorRepo) {
    this.vendorRepo = vendorRepo;
  }

  vendorLogin = async (loginVendor: LoginVendorDTO): Promise<LoginResponse> => {
    try {
      // findVendor now handles person lookup internally
      const vendor = await this.vendorRepo.findVendor({
        email: loginVendor.email,
      });

      if (!vendor || !vendor.password || !vendor.salt) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = await verifyPassword(
        loginVendor.password,
        vendor.password,
        vendor.salt
      );

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const authPayload: VendorPayload = {
        _id: vendor.vendorId!.toString(),
        role: "vendor",
        email: vendor.ownerEmail!,
        verified: vendor.verified,
      };

      const accessToken = generateAccessToken(authPayload);
      const refreshToken = generateRefreshToken(authPayload);

      await this.vendorRepo.updateRefreshToken(vendor.vendorId!, refreshToken);

      return {
        vendor,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error("Error in vendorLogin:", error);
      throw error;
    }
  };

  vendorProfile = async (vendorId: number): Promise<VendorEntity | null> => {
    return await this.vendorRepo.findVendor({ vendorId });
  };

  updateVendorProfile = async (
    vendorId: number,
    updateData: EditVendorProfileDTO
  ): Promise<VendorEntity | null> => {
    try {
      const updatedVendor = await this.vendorRepo.updateOwnerProfile(vendorId, updateData);
      if (!updatedVendor) {
        throw new Error("failed to update vendor profile");
      }
      return updatedVendor;
    } catch (error) {
      console.error("Error in updateVendorProfile:", error);
      throw error;
    }
  };

  updateShopImage = async (
    vendorId: number,
    file: any
  ): Promise<VendorEntity | null> => {
    try {
      const secure_url = "http://example.com/image.jpg";

      const updatedVendor = await this.vendorRepo.updateShopImage(vendorId, secure_url);
      if (!updatedVendor) {
        throw new Error("failed to update shop image");
      }
      return updatedVendor;
    } catch (error) {
      console.error("Error in updateShopImage:", error);
      throw error;
    }
  };
}

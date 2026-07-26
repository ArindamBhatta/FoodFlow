import { ControllerPayload } from "../../../constants";
import {
  EditVendorProfileDTO,
  LoginVendorDTO,
  VendorResponseDTO,
} from "../../dto/interface/Vendor.dto";

import { CreateFoodInput } from "../../dto/interface/Food.dto";
import FoodService from "../../services/FoodService/FoodService";
import VendorService from "../../services/VendorService/VendorService";
import { LoginResponse as ServiceLoginResponse } from "../../services/VendorService/VendorService.interface";
import {
  UnauthorizedError,
  NotFoundError
} from "../../utils/Error";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/auth.utility";
import IVendorController, { LoginResponse as ControllerLoginResponse } from "./VendorController.interface";

export default class VendorController implements IVendorController {
  private vendorService: VendorService;
  private foodService: FoodService;
  constructor(vendorService: VendorService, foodService: FoodService) {
    this.vendorService = vendorService;
    this.foodService = foodService;
  }

  vendorLogin = async (payload: ControllerPayload): Promise<ControllerLoginResponse> => {
    try {
      const loginVendor = new LoginVendorDTO();
      Object.assign(loginVendor, payload.req.body);

      const loginResponse: ServiceLoginResponse = await this.vendorService.vendorLogin(loginVendor);

      const vendorResponse = new VendorResponseDTO(loginResponse.vendor);

      return {
        vendor: vendorResponse,
        accessToken: loginResponse.accessToken,
      };
    } catch (error: any) {
      console.error("Error in vendorLogin:", error);
      throw error;
    }
  };

  refreshTokenRegenerate = async (payload: ControllerPayload) => {
    try {
      const oldRefreshToken = payload.req.cookies?.refreshToken || payload.req.body.refreshToken;
      if (!oldRefreshToken) {
        return payload.res.status(401).json({ success: false, message: "No refresh token provided" });
      }

      const payloadData = verifyRefreshToken(oldRefreshToken);
      if (!payloadData || !payloadData._id) {
        return payload.res.status(401).json({ success: false, message: "Invalid refresh token" });
      }

      const vendor = await this.vendorService.vendorProfile(parseInt(payloadData._id));
      if (!vendor) {
        return payload.res.status(404).json({ success: false, message: "Vendor not found" });
      }

      const newRefreshToken = generateRefreshToken(payloadData);
      const newAccessToken = generateAccessToken(payloadData);

      return payload.res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    } catch (error: any) {
      return payload.res.status(500).json({ success: false, message: error.message });
    }
  };

  vendorProfile = async (payload: ControllerPayload): Promise<VendorResponseDTO> => {
    try {
      const user = payload.req.user;
      if (!user) throw new UnauthorizedError();

      const vendor = await this.vendorService.vendorProfile(parseInt(user._id));
      if (!vendor) throw new NotFoundError("Vendor not found");

      const response = new VendorResponseDTO(vendor);
      return {
        ...response,
        ownerName: vendor.ownerName!,
        ownerEmail: vendor.ownerEmail!,
        ownerPhone: vendor.ownerPhone!
      };
    } catch (error: any) {
      console.error("Error in vendorProfile:", error);
      throw error;
    }
  };

  updateVendorProfile = async (payload: ControllerPayload): Promise<VendorResponseDTO> => {
    try {
      const user = payload.req.user;
      if (!user) throw new UnauthorizedError();

      const updateData = new EditVendorProfileDTO();
      Object.assign(updateData, payload.req.body);

      const updatedVendor = await this.vendorService.updateVendorProfile(parseInt(user._id), updateData);
      if (!updatedVendor) throw new NotFoundError("Vendor not found");

      return new VendorResponseDTO(updatedVendor);
    } catch (error: any) {
      console.error("Error in updateVendorProfile:", error);
      throw error;
    }
  };

  updateShopImage = async (payload: ControllerPayload): Promise<VendorResponseDTO> => {
    try {
      const user = payload.req.user;
      if (!user) throw new UnauthorizedError();

      const updatedVendor = await this.vendorService.updateShopImage(parseInt(user._id), payload.req.file);
      if (!updatedVendor) throw new NotFoundError("Vendor not found");

      return new VendorResponseDTO(updatedVendor);
    } catch (error: any) {
      console.error("Error in updateShopImage:", error);
      throw error;
    }
  };

  vendorAddFoods = async (payload: ControllerPayload): Promise<any> => {
    try {
      const user = payload.req.user;
      if (!user) throw new UnauthorizedError();

      const input = new CreateFoodInput(payload.req.body);
      const createdFood = await this.foodService.addFood(parseInt(user._id), input, payload.req.files as any[]);

      return {
        food: createdFood,
        message: "Food added successfully",
      };
    } catch (error: any) {
      console.error("Error in vendorAddFoods:", error);
      throw error;
    }
  };

  fetchAllFood = async (payload: ControllerPayload): Promise<any[]> => {
    try {
      const user = payload.req.user;
      if (!user) throw new UnauthorizedError();

      const foods = await this.foodService.getFoods(parseInt(user._id));
      return foods;
    } catch (error: any) {
      console.error("Error in fetchAllFood:", error);
      throw error;
    }
  };

  getCurrentOrder = async (payload: ControllerPayload) => { throw new Error("Not implemented"); };
  getOrderDetails = async (payload: ControllerPayload) => { throw new Error("Not implemented"); };
  processOrder = (payload: ControllerPayload) => { throw new Error("Not implemented"); };
}

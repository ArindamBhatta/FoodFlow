import { ControllerPayload } from "../../../constants";
import { VendorResponseDTO } from "../../dto/interface/Vendor.dto";

export default interface IVendorController {
  vendorLogin: (payload: ControllerPayload) => Promise<LoginResponse>;
  vendorProfile: (payload: ControllerPayload) => Promise<VendorResponseDTO>;
  updateVendorProfile: (payload: ControllerPayload) => Promise<VendorResponseDTO>;
  updateShopImage: (payload: ControllerPayload) => Promise<VendorResponseDTO>;
  vendorAddFoods: (payload: ControllerPayload) => Promise<any>;
  fetchAllFood: (payload: ControllerPayload) => Promise<any[]>;
  getCurrentOrder: (payload: ControllerPayload) => Promise<any>;
  getOrderDetails: (payload: ControllerPayload) => Promise<any>;
  processOrder: (payload: ControllerPayload) => Promise<any>;
}

export interface LoginResponse {
  vendor: VendorResponseDTO;
  accessToken: string;
}

import { ControllerPayload } from "../../../constants";
import { VendorResponseDTO } from "../../dto/interface/Vendor.dto";
import { AdminResponseDTO } from "../../dto/interface/Admin.dto";

export default interface IAdminController {
  createVendor: (payload: ControllerPayload) => Promise<VendorResponseDTO>;
  getAllVendor: (payload: ControllerPayload) => Promise<VendorResponseDTO[]>;
  getVendorById: (payload: ControllerPayload) => Promise<VendorResponseDTO>;
  signUp: (payload: ControllerPayload) => Promise<{ admin: AdminResponseDTO; accessToken: string }>;
  signIn: (payload: ControllerPayload) => Promise<{ admin: AdminResponseDTO; accessToken: string }>;
}


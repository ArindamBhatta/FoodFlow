import IAdminController from "./AdminController.interface";
import {
  CreateVendorDTO,
  VendorResponseDTO,
} from "../../dto/interface/Vendor.dto";
import {
  AdminResponseDTO,
  CreateAdminDTO,
  LoginAdminDTO
} from "../../dto/interface/Admin.dto";
import { ControllerPayload } from "../../../constants";
import logger from "../../../infrastructure/logger/winston";
import IAdminService from "../../services/AdminService/AdminService.interface";

export default class AdminController implements IAdminController {
  private adminService: IAdminService;

  constructor(adminService: IAdminService) {
    this.adminService = adminService;
  }

  signUp = async (payload: ControllerPayload): Promise<{ admin: AdminResponseDTO; accessToken: string }> => {
    try {
      const adminDto = new CreateAdminDTO(payload.req.body);
      const result = await this.adminService.adminSignUp(adminDto);
      return {
        admin: new AdminResponseDTO(result.admin),
        accessToken: result.signature,
      };
    } catch (error: any) {
      logger.error("Error in AdminController.signUp:", error);
      throw error;
    }
  };

  signIn = async (payload: ControllerPayload): Promise<{ admin: AdminResponseDTO; accessToken: string }> => {
    try {
      const loginDto = new LoginAdminDTO();
      Object.assign(loginDto, payload.req.body);
      const result = await this.adminService.adminLogin(loginDto);
      return {
        admin: new AdminResponseDTO(result.admin),
        accessToken: result.signature,
      };
    } catch (error: any) {
      logger.error("Error in AdminController.signIn:", error);
      throw error;
    }
  };

  createVendor = async (
    payload: ControllerPayload
  ): Promise<VendorResponseDTO> => {
    try {
      const createVendorDTO = new CreateVendorDTO(payload.req.body);
      const vendor = await this.adminService.createVendor(createVendorDTO);
      const response = new VendorResponseDTO(vendor);
      return response;
    } catch (error: any) {
      logger.error("Error in AdminController.createVendor:", error);
      throw error;
    }
  };

  getAllVendor = async (
    payload: ControllerPayload
  ): Promise<VendorResponseDTO[]> => {
    try {
      const vendors = await this.adminService.getAllVendor();
      const response: VendorResponseDTO[] = vendors.map((vendor) => new VendorResponseDTO(vendor));
      return response;
    } catch (error: any) {
      logger.error("Error in AdminController.getAllVendor:", error);
      throw error;
    }
  };

  getVendorById = async (
    payload: ControllerPayload
  ): Promise<VendorResponseDTO> => {
    const { id } = payload.req.params;
    if (typeof id !== 'string') {
      throw new Error("Invalid vendor ID");
    }
    const vendorId: number = parseInt(id);

    try {
      const vendor = await this.adminService.getVendorByID(vendorId);
      if (!vendor) {
        throw new Error("Vendor not found");
      }
      const response = new VendorResponseDTO(vendor);
      return response;
    } catch (error: any) {
      logger.error("Error in AdminController.getVendorByID:", error);
      throw error;
    }
  };




}

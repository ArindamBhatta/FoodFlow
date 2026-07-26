import { ControllerPayload } from "../../../constants";
import {
  CreateCustomerDTO,
  CustomerLoginDTO,
  CustomerPayload,
  EditCustomerProfileInputs,
  OrderInputs,
  CreateOrderDTO
} from "../../dto/interface/Customer.dto";
import ICustomerController from "./CustomerController.interface";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/auth.utility";
import ICustomerService from "../../services/CustomerService/CustomerService.interface";

export default class CustomerController implements ICustomerController {
  private customerService: ICustomerService;
  constructor(customerService: ICustomerService) {
    this.customerService = customerService;
  }

  signUp = async (payload: ControllerPayload) => {
    try {
      const input = new CreateCustomerDTO(payload.req.body);
      const result = await this.customerService.signUp(input);

      return {
        customer: result.customer,
        accessToken: result.signature,
        message: "Customer created successfully.",
      };
    } catch (error: any) {
      console.error("Error in signUp:", error);
      throw error;
    }
  };

  signIn = async (payload: ControllerPayload) => {
    try {
      const input: CustomerLoginDTO = payload.req.body;

      if (!input.email && !input.phone) {
        throw new Error("Email or phone number is required for login");
      }

      if (!input.password) {
        throw new Error("Password is required");
      }

      const result = await this.customerService.signIn(
        input.password,
        input.email,
        input.phone
      );

      if (!result) {
        throw new Error("Invalid credentials");
      }

      return {
        accessToken: result.signature,
        signature: result.signature,
      };
    } catch (error: any) {
      console.error("Error in signIn:", error);
      throw error;
    }
  };

  profileDetails = async (payload: ControllerPayload) => {
    try {
      const customer = payload.req.user;
      if (!customer || !customer._id) {
        throw new Error("User not authenticated");
      }

      const profile = await this.customerService.getCustomerById(parseInt(customer._id));
      return { profile };
    } catch (error: any) {
      console.error("Error in profileDetails:", error);
      throw error;
    }
  };

  addDetailsOfUser = async (payload: ControllerPayload) => {
    try {
      const customer = payload.req.user;
      if (!customer || !customer._id) {
        throw new Error("User not authenticated");
      }

      const input = new EditCustomerProfileInputs(payload.req.body);
      const updatedCustomer = await this.customerService.updateProfile(
        parseInt(customer._id),
        input
      );

      return {
        message: "Profile updated successfully",
        customer: updatedCustomer,
      };
    } catch (error: any) {
      console.error("Error in addDetailsOfUser:", error);
      throw error;
    }
  };

  addToWishlist = async (payload: ControllerPayload) => {
    const customer = payload.req.user;
    if (!customer) throw new Error("Unauthorized");

    const { foodDocId, unit } = payload.req.body;
    try {
      const updatedCart = await this.customerService.addToCart(
        parseInt(customer._id),
        parseInt(foodDocId),
        unit
      );
      return { cart: updatedCart };
    } catch (error: any) {
      console.error("Error in addToWishlist:", error);
      throw error;
    }
  };

  allWishlistFood = async (payload: ControllerPayload) => {
    const customer = payload.req.user;
    if (!customer) throw new Error("Unauthorized");
    try {
      const cart = await this.customerService.getCart(parseInt(customer._id));
      return { cart };
    } catch (error: any) {
      console.error("Error in allWishlistFood:", error);
      throw error;
    }
  };

  createOrder = async (payload: ControllerPayload) => {
    try {
      const customer = payload.req.user;
      if (!customer || !customer._id) {
        throw new Error("User not authenticated");
      }

      const input = new CreateOrderDTO(payload.req.body);
      const result = await this.customerService.createOrder(
        parseInt(customer._id),
        input
      );

      return {
        message: "Order created successfully",
        order: result,
      };
    } catch (error: any) {
      console.error("Error in createOrder:", error);
      throw error;
    }
  };
}

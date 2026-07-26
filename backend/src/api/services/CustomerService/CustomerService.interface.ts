import { CreateCustomerDTO, EditCustomerProfileInputs, CreateOrderDTO } from "../../dto/interface/Customer.dto";
import CustomerEntity from "../../entity/CustomerEntity";


export default interface ICustomerService {
  signUp(
    input: CreateCustomerDTO
  ): Promise<{ customer: CustomerEntity; signature: string }>;
  signIn(password: string, email?: string, phone?: string): Promise<{ customer: CustomerEntity; signature: string } | null>;
  getCustomerById(id: number): Promise<CustomerEntity | null>;
  updateProfile(customerId: number, input: EditCustomerProfileInputs): Promise<CustomerEntity | null>;
  addToCart(customerId: number, foodId: number, unit: number): Promise<any>;
  getCart(customerId: number): Promise<any>;
  createOrder(customerId: number, input: CreateOrderDTO): Promise<any>;
}

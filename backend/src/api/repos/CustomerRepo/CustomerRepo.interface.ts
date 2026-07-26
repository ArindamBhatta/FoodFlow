import CustomerEntity from "../../entity/CustomerEntity";

export default interface ICustomerRepo {
  existingCustomer(
    email?: string,
    phone?: string,
    id?: number
  ): Promise<CustomerEntity | null>;
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity>;
  verifyOtp(
    otp: number,
    email?: string,
    phone?: string,
    customerId?: number
  ): Promise<CustomerEntity | null>;
  addToCart(customerId: number, foodId: number, unit: number): Promise<any>;
  getCart(customerId: number): Promise<any>;
}

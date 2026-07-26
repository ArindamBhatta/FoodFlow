import ICustomerService from "./CustomerService.interface";
import CustomerRepo from "../../repos/CustomerRepo/CustomerRepo";
import PersonRepo from "../../repos/PersonRepo/PersonRepo";
import FoodRepo from "../../repos/FoodRepo/FoodRepo";
import PersonEntity from "../../entity/PersonEntity";
import CustomerEntity from "../../entity/CustomerEntity";
import {
  generateAccessToken,
  generateSalt,
  hashPassword,
  verifyPassword,
} from "../../utils/auth.utility";
import { CreateCustomerDTO, EditCustomerProfileInputs, CreateOrderDTO } from "../../dto/interface/Customer.dto";
import OrderRepo from "../../repos/OrderRepo/OrderRepo";
import OrderEntity from "../../entity/OrderEntity";
import OrderItemEntity from "../../entity/OrderItemEntity";

export default class CustomerService implements ICustomerService {
  private customerRepo: CustomerRepo;
  private personRepo: PersonRepo;
  private foodRepo: FoodRepo;
  private orderRepo: OrderRepo;

  constructor(
    customerRepo: CustomerRepo,
    personRepo: PersonRepo,
    foodRepo: FoodRepo,
    orderRepo: OrderRepo
  ) {
    this.customerRepo = customerRepo;
    this.personRepo = personRepo;
    this.foodRepo = foodRepo;
    this.orderRepo = orderRepo;
  }

  signUp = async (
    input: CreateCustomerDTO
  ): Promise<{ customer: CustomerEntity; signature: string }> => {
    try {
      const existing = await this.customerRepo.existingCustomer(input.email);
      if (existing) throw new Error("Customer already exists");

      const salt = await generateSalt();
      const hashedPassword = await hashPassword(input.password, salt);

      const person = new PersonEntity({
        fullName: input.email.split("@")[0],
        email: input.email,
        phoneNumber: input.phone,
        password: hashedPassword,
        salt: salt,
        verified: true,
      });

      const savedPerson = await this.personRepo.create(person);

      const customer = new CustomerEntity({
        personId: savedPerson.personId,
        isActive: true,
      });

      const savedCustomer = await this.customerRepo.createCustomer(customer);

      const signature = generateAccessToken({
        _id: savedCustomer.customerId!.toString(),
        email: savedPerson.email,
        verified: savedPerson.verified,
        role: "customer",
      });

      return { customer: savedCustomer, signature };
    } catch (error) {
      console.error("Error in CustomerService.signUp:", error);
      throw error;
    }
  };

  signIn = async (password: string, email?: string, phone?: string) => {
    try {
      const customer = await this.customerRepo.existingCustomer(email, phone);
      if (!customer || !customer.personId) return null;

      const person = await this.personRepo.getById(customer.personId);
      if (!person || !person.password || !person.salt) return null;

      const isPasswordValid = await verifyPassword(
        password,
        person.password,
        person.salt
      );
      if (!isPasswordValid) return null;

      const signature = generateAccessToken({
        _id: customer.customerId!.toString(),
        email: person.email,
        verified: person.verified,
        role: "customer",
      });

      return { customer, signature };
    } catch (error) {
      console.error("Error in CustomerService.signIn:", error);
      throw error;
    }
  };

  getCustomerById = async (id: number) => {
    return await this.customerRepo.existingCustomer(undefined, undefined, id);
  };

  updateProfile = async (
    customerId: number,
    input: EditCustomerProfileInputs
  ) => {
    const customer = await this.customerRepo.existingCustomer(undefined, undefined, customerId);
    if (!customer || !customer.personId) return null;

    await this.personRepo.update(customer.personId, {
      fullName: input.firstName + " " + input.lastName,
    });

    return customer;
  };

  addToCart = async (customerId: number, foodId: number, unit: number) => {
    return await this.customerRepo.addToCart(customerId, foodId, unit);
  };

  getCart = async (customerId: number) => {
    return await this.customerRepo.getCart(customerId);
  };

  createOrder = async (customerId: number, input: CreateOrderDTO) => {
    try {
      let subtotalAmount = 0;
      let vendorId = 0;

      const orderItems: any[] = [];

      for (const item of input.items) {
        const foodId = parseInt(item._id);
        const food = await this.foodRepo.getFoodById(foodId);
        if (!food) throw new Error(`Food item ${foodId} not found`);

        if (vendorId === 0) {
          vendorId = food.vendorId!;
        } else if (vendorId !== food.vendorId) {
          throw new Error("All items in an order must be from the same vendor");
        }

        const itemTotal = food.price * item.unit;
        subtotalAmount += itemTotal;

        orderItems.push({
          foodId: foodId,
          quantity: item.unit,
          unitPrice: food.price,
          itemTotal: itemTotal,
        });
      }

      const taxAmount = subtotalAmount * 0.05; // 5% tax example
      const totalAmount = subtotalAmount + taxAmount;

      const orderEntity = new OrderEntity({
        customerId,
        vendorId,
        subtotalAmount,
        taxAmount,
        totalAmount,
        orderStatus: "Waiting",
        paymentStatus: "Waiting",
      });

      const savedOrder = await this.orderRepo.createOrder(orderEntity);

      for (const item of orderItems) {
        const orderItem = new OrderItemEntity({
          orderId: savedOrder.orderId,
          foodId: item.foodId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          itemTotal: item.itemTotal,
        });
        await this.orderRepo.createOrderItem(orderItem);
      }

      return savedOrder;
    } catch (error) {
      console.error("Error in CustomerService.createOrder:", error);
      throw error;
    }
  };
}

import { CustomerDAO } from "../../../infrastructure/daos/CustomerDAO";
import { PersonDAO } from "../../../infrastructure/daos/PersonDAO";
import { CartDAO } from "../../../infrastructure/daos/CartDAO";
import { CartItemDAO } from "../../../infrastructure/daos/CartItemDAO";
import CustomerEntity from "../../entity/CustomerEntity";
import ICustomerRepo from "./CustomerRepo.interface";

export default class CustomerRepo implements ICustomerRepo {
  private customerDao: CustomerDAO;
  private personDao: PersonDAO;
  private cartDao: CartDAO;
  private cartItemDao: CartItemDAO;

  constructor(
    customerDao: CustomerDAO,
    personDao: PersonDAO,
    cartDao: CartDAO,
    cartItemDao: CartItemDAO
  ) {
    this.customerDao = customerDao;
    this.personDao = personDao;
    this.cartDao = cartDao;
    this.cartItemDao = cartItemDao;
  }

  existingCustomer = async (
    email?: string,
    phone?: string,
    id?: number
  ): Promise<CustomerEntity | null> => {
    try {
      if (id) {
        const row = await this.customerDao.getById(id);
        return row ? CustomerEntity.fromRow(row) : null;
      }

      if (email || phone) {
        let personRow = null;
        if (email) {
          personRow = await this.personDao.getByEmail(email);
        }
        // phone search could be added here if PersonDAO supported it

        if (personRow) {
          const customerRow = await this.customerDao.getByPersonId(personRow.personId);
          return customerRow ? CustomerEntity.fromRow(customerRow) : null;
        }
      }
      return null;
    } catch (error) {
      console.error("Error in CustomerRepo.existingCustomer:", error);
      throw error;
    }
  };

  createCustomer = async (customer: CustomerEntity): Promise<CustomerEntity> => {
    const rawData = customer.toRow();
    const savedRow = await this.customerDao.create(rawData);
    return CustomerEntity.fromRow(savedRow);
  };

  verifyOtp = async (
    otp: number,
    email?: string,
    phone?: string,
    customerId?: number
  ): Promise<CustomerEntity | null> => {
    try {
      let customerRow = null;
      let personRow = null;

      if (customerId) {
        customerRow = await this.customerDao.getById(customerId);
        if (customerRow && customerRow.personId !== null) {
          personRow = await this.personDao.getById(customerRow.personId);
        }
      } else if (email) {
        personRow = await this.personDao.getByEmail(email);
        if (personRow) {
          customerRow = await this.customerDao.getByPersonId(personRow.personId);
        }
      }

      if (!customerRow || !personRow) return null;

      // Verify OTP and check expiry
      if (personRow.otp === otp && personRow.otpExpiry && personRow.otpExpiry >= new Date()) {
        await this.personDao.update(personRow.personId, {
          verified: true,
          otp: null,
          otpExpiry: null
        });
        return CustomerEntity.fromRow(customerRow);
      }

      return null;
    } catch (error) {
      console.error("Error in CustomerRepo.verifyOtp:", error);
      throw error;
    }
  };

  addToCart = async (customerId: number, foodId: number, unit: number) => {
    try {
      let cartRow = await this.cartDao.getByCustomerId(customerId);
      if (!cartRow) {
        cartRow = await this.cartDao.create({ customerId });
      }

      const existingItem = await this.cartItemDao.getByCartIdAndFoodId(cartRow.cartId, foodId);

      if (existingItem) {
        if (unit > 0) {
          await this.cartItemDao.update(existingItem.cartItemId, { quantity: unit });
        } else {
          await this.cartItemDao.delete(existingItem.cartItemId);
        }
      } else if (unit > 0) {
        await this.cartItemDao.create({
          cartId: cartRow.cartId,
          foodId: foodId,
          quantity: unit
        });
      }

      return await this.getCart(customerId);
    } catch (error) {
      console.error("Error in CustomerRepo.addToCart:", error);
      throw error;
    }
  };

  getCart = async (customerId: number) => {
    try {
      const cartRow = await this.cartDao.getByCustomerId(customerId);
      if (!cartRow) return [];

      const items = await this.cartItemDao.getByCartId(cartRow.cartId);
      return items;
    } catch (error) {
      console.error("Error in CustomerRepo.getCart:", error);
      throw error;
    }
  };
}

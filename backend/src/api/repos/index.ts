import { VendorDAO } from "../../infrastructure/daos/VendorDAO";
import { FoodDAO } from "../../infrastructure/daos/FoodDAO";
import { CustomerDAO } from "../../infrastructure/daos/CustomerDAO";
import { PersonDAO } from "../../infrastructure/daos/PersonDAO";
import { CartDAO } from "../../infrastructure/daos/CartDAO";
import { CartItemDAO } from "../../infrastructure/daos/CartItemDAO";
import { AdminDAO } from "../../infrastructure/daos/AdminDAO";

// Initialize repositories
import AdminRepo from "./AdminRepo/AdminRepo";
import VendorRepo from "./VendorRepo/VendorRepo";
import FoodRepo from "./FoodRepo/FoodRepo";
import CustomerRepo from "./CustomerRepo/CustomerRepo";
import PersonRepo from "./PersonRepo/PersonRepo";
import OrderRepo from "./OrderRepo/OrderRepo";
import { OrderDAO } from "../../infrastructure/daos/OrderDAO";
import { OrderItemDAO } from "../../infrastructure/daos/OrderItemDAO";

// Create DAO instances
const vendorDAO = new VendorDAO();
const foodDAO = new FoodDAO();
const customerDAO = new CustomerDAO();
const personDAO = new PersonDAO();
const cartDAO = new CartDAO();
const cartItemDAO = new CartItemDAO();
const adminDAO = new AdminDAO();
const orderDAO = new OrderDAO();
const orderItemDAO = new OrderItemDAO();

// Create repository instances
const adminRepo = new AdminRepo(personDAO, adminDAO);
const vendorRepo = new VendorRepo(vendorDAO, personDAO);
const customerRepo = new CustomerRepo(customerDAO, personDAO, cartDAO, cartItemDAO);
const foodRepo = new FoodRepo(foodDAO, vendorDAO);
const personRepo = new PersonRepo(personDAO);
const orderRepo = new OrderRepo(orderDAO, orderItemDAO);

// Export repositories
export { adminRepo, vendorRepo, foodRepo, customerRepo, personRepo, orderRepo };

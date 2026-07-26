import { OrderDAO } from "../../../infrastructure/daos/OrderDAO";
import { OrderItemDAO } from "../../../infrastructure/daos/OrderItemDAO";
import OrderEntity from "../../entity/OrderEntity";
import OrderItemEntity from "../../entity/OrderItemEntity";
import IOrderRepo from "./OrderRepo.interface";

export default class OrderRepo implements IOrderRepo {
    private orderDao: OrderDAO;
    private orderItemDao: OrderItemDAO;

    constructor(orderDao: OrderDAO, orderItemDao: OrderItemDAO) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
    }

    createOrder = async (order: OrderEntity): Promise<OrderEntity> => {
        try {
            const row = await this.orderDao.create(order.toRow());
            return OrderEntity.fromRow(row);
        } catch (error) {
            console.error("Error in OrderRepo.createOrder:", error);
            throw error;
        }
    };

    createOrderItem = async (
        orderItem: OrderItemEntity
    ): Promise<OrderItemEntity> => {
        try {
            const row = await this.orderItemDao.create(orderItem.toRow());
            return OrderItemEntity.fromRow(row);
        } catch (error) {
            console.error("Error in OrderRepo.createOrderItem:", error);
            throw error;
        }
    };
}

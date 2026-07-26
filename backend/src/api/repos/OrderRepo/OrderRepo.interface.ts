import OrderEntity from "../../entity/OrderEntity";
import OrderItemEntity from "../../entity/OrderItemEntity";

export default interface IOrderRepo {
    createOrder(order: OrderEntity): Promise<OrderEntity>;
    createOrderItem(orderItem: OrderItemEntity): Promise<OrderItemEntity>;
}

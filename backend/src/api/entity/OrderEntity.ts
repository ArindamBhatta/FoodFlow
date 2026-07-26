export default class OrderEntity {
    private _orderId?: number;
    private _customerId?: number | null;
    private _vendorId?: number | null;
    private _deliveryAddressId?: number | null;
    private _orderDate: string;
    private _orderTime: string;
    private _orderStatus?: string | null;
    private _subtotalAmount: number;
    private _taxAmount: number;
    private _deliveryCharge: number;
    private _discountAmount: number;
    private _totalAmount: number;
    private _paymentStatus?: string | null;
    private _specialInstructions?: string | null;
    private _estimatedDeliveryTime?: Date | null;
    private _actualDeliveryTime?: Date | null;

    constructor(data: {
        orderId?: number;
        customerId?: number | null;
        vendorId?: number | null;
        deliveryAddressId?: number | null;
        orderDate?: string;
        orderTime?: string;
        orderStatus?: string | null;
        subtotalAmount: number;
        taxAmount: number;
        deliveryCharge?: number;
        discountAmount?: number;
        totalAmount: number;
        paymentStatus?: string | null;
        specialInstructions?: string | null;
        estimatedDeliveryTime?: Date | null;
        actualDeliveryTime?: Date | null;
    }) {
        this._orderId = data.orderId;
        this._customerId = data.customerId;
        this._vendorId = data.vendorId;
        this._deliveryAddressId = data.deliveryAddressId;
        this._orderDate = data.orderDate || new Date().toISOString().split('T')[0];
        this._orderTime = data.orderTime || new Date().toTimeString().split(' ')[0];
        this._orderStatus = data.orderStatus;
        this._subtotalAmount = data.subtotalAmount;
        this._taxAmount = data.taxAmount;
        this._deliveryCharge = data.deliveryCharge ?? 0;
        this._discountAmount = data.discountAmount ?? 0;
        this._totalAmount = data.totalAmount;
        this._paymentStatus = data.paymentStatus;
        this._specialInstructions = data.specialInstructions;
        this._estimatedDeliveryTime = data.estimatedDeliveryTime;
        this._actualDeliveryTime = data.actualDeliveryTime;
    }

    get orderId() { return this._orderId; }
    get customerId() { return this._customerId; }
    get vendorId() { return this._vendorId; }
    get deliveryAddressId() { return this._deliveryAddressId; }
    get orderDate() { return this._orderDate; }
    get orderTime() { return this._orderTime; }
    get orderStatus() { return this._orderStatus; }
    get subtotalAmount() { return this._subtotalAmount; }
    get taxAmount() { return this._taxAmount; }
    get deliveryCharge() { return this._deliveryCharge; }
    get discountAmount() { return this._discountAmount; }
    get totalAmount() { return this._totalAmount; }
    get paymentStatus() { return this._paymentStatus; }
    get specialInstructions() { return this._specialInstructions; }
    get estimatedDeliveryTime() { return this._estimatedDeliveryTime; }
    get actualDeliveryTime() { return this._actualDeliveryTime; }

    static fromRow(row: any): OrderEntity {
        return new OrderEntity({
            orderId: row.orderId,
            customerId: row.customerId,
            vendorId: row.vendorId,
            deliveryAddressId: row.deliveryAddressId,
            orderDate: row.orderDate,
            orderTime: row.orderTime,
            orderStatus: row.orderStatus,
            subtotalAmount: row.subtotalAmount,
            taxAmount: row.taxAmount,
            deliveryCharge: row.deliveryCharge,
            discountAmount: row.discountAmount,
            totalAmount: row.totalAmount,
            paymentStatus: row.paymentStatus,
            specialInstructions: row.specialInstructions,
            estimatedDeliveryTime: row.estimatedDeliveryTime,
            actualDeliveryTime: row.actualDeliveryTime,
        });
    }

    toRow() {
        return {
            customerId: this._customerId,
            vendorId: this._vendorId,
            deliveryAddressId: this._deliveryAddressId,
            orderDate: this._orderDate,
            orderTime: this._orderTime,
            orderStatus: this._orderStatus,
            subtotalAmount: this._subtotalAmount,
            taxAmount: this._taxAmount,
            deliveryCharge: this._deliveryCharge,
            discountAmount: this._discountAmount,
            totalAmount: this._totalAmount,
            paymentStatus: this._paymentStatus,
            specialInstructions: this._specialInstructions,
            estimatedDeliveryTime: this._estimatedDeliveryTime,
            actualDeliveryTime: this._actualDeliveryTime,
        };
    }
}

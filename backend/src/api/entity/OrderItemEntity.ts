export default class OrderItemEntity {
    private _orderItemId?: number;
    private _orderId?: number | null;
    private _foodId?: number | null;
    private _quantity: number;
    private _unitPrice: number;
    private _customizationNotes?: string | null;
    private _itemTotal: number;

    constructor(data: {
        orderItemId?: number;
        orderId?: number | null;
        foodId?: number | null;
        quantity: number;
        unitPrice: number;
        customizationNotes?: string | null;
        itemTotal: number;
    }) {
        this._orderItemId = data.orderItemId;
        this._orderId = data.orderId;
        this._foodId = data.foodId;
        this._quantity = data.quantity;
        this._unitPrice = data.unitPrice;
        this._customizationNotes = data.customizationNotes;
        this._itemTotal = data.itemTotal;
    }

    get orderItemId() { return this._orderItemId; }
    get orderId() { return this._orderId; }
    get foodId() { return this._foodId; }
    get quantity() { return this._quantity; }
    get unitPrice() { return this._unitPrice; }
    get customizationNotes() { return this._customizationNotes; }
    get itemTotal() { return this._itemTotal; }

    static fromRow(row: any): OrderItemEntity {
        return new OrderItemEntity({
            orderItemId: row.orderItemId,
            orderId: row.orderId,
            foodId: row.foodId,
            quantity: row.quantity,
            unitPrice: row.unitPrice,
            customizationNotes: row.customizationNotes,
            itemTotal: row.itemTotal,
        });
    }

    toRow() {
        return {
            orderId: this._orderId,
            foodId: this._foodId,
            quantity: this._quantity,
            unitPrice: this._unitPrice,
            customizationNotes: this._customizationNotes,
            itemTotal: this._itemTotal,
        };
    }
}

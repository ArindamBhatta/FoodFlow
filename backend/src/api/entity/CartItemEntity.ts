export default class CartItemEntity {
    private _cartItemId?: number;
    private _cartId?: number | null;
    private _foodId?: number | null;
    private _quantity: number;
    private _customizationNotes?: string | null;
    private _addedAt: Date;

    constructor(data: {
        cartItemId?: number;
        cartId?: number | null;
        foodId?: number | null;
        quantity: number;
        customizationNotes?: string | null;
        addedAt?: Date;
    }) {
        this._cartItemId = data.cartItemId;
        this._cartId = data.cartId;
        this._foodId = data.foodId;
        this._quantity = data.quantity;
        this._customizationNotes = data.customizationNotes;
        this._addedAt = data.addedAt || new Date();
    }

    get cartItemId() { return this._cartItemId; }
    get cartId() { return this._cartId; }
    get foodId() { return this._foodId; }
    get quantity() { return this._quantity; }
    get customizationNotes() { return this._customizationNotes; }
    get addedAt() { return this._addedAt; }

    static fromRow(row: any): CartItemEntity {
        return new CartItemEntity({
            cartItemId: row.cartItemId,
            cartId: row.cartId,
            foodId: row.foodId,
            quantity: row.quantity,
            customizationNotes: row.customizationNotes,
            addedAt: row.addedAt,
        });
    }

    toRow() {
        return {
            cartId: this._cartId,
            foodId: this._foodId,
            quantity: this._quantity,
            customizationNotes: this._customizationNotes,
            addedAt: this._addedAt,
        };
    }
}

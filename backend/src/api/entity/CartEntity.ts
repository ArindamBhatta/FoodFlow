export default class CartEntity {
    private _cartId?: number;
    private _customerId?: number | null;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(data: {
        cartId?: number;
        customerId?: number | null;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this._cartId = data.cartId;
        this._customerId = data.customerId;
        this._createdAt = data.createdAt || new Date();
        this._updatedAt = data.updatedAt || new Date();
    }

    get cartId() { return this._cartId; }
    get customerId() { return this._customerId; }
    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }

    static fromRow(row: any): CartEntity {
        return new CartEntity({
            cartId: row.cartId,
            customerId: row.customerId,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }

    toRow() {
        return {
            customerId: this._customerId,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
}

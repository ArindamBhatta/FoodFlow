export default class CustomerFavoriteEntity {
    private _favoriteId?: number;
    private _customerId?: number | null;
    private _foodId?: number | null;
    private _addedDate: Date;

    constructor(data: {
        favoriteId?: number;
        customerId?: number | null;
        foodId?: number | null;
        addedDate?: Date;
    }) {
        this._favoriteId = data.favoriteId;
        this._customerId = data.customerId;
        this._foodId = data.foodId;
        this._addedDate = data.addedDate || new Date();
    }

    get favoriteId() { return this._favoriteId; }
    get customerId() { return this._customerId; }
    get foodId() { return this._foodId; }
    get addedDate() { return this._addedDate; }

    static fromRow(row: any): CustomerFavoriteEntity {
        return new CustomerFavoriteEntity({
            favoriteId: row.favoriteId,
            customerId: row.customerId,
            foodId: row.foodId,
            addedDate: row.addedDate,
        });
    }

    toRow() {
        return {
            customerId: this._customerId,
            foodId: this._foodId,
            addedDate: this._addedDate,
        };
    }
}

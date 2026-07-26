export default class CouponUsageEntity {
    private _usageId?: number;
    private _couponId?: number | null;
    private _customerId?: number | null;
    private _orderId?: number | null;
    private _usedDate: Date;

    constructor(data: {
        usageId?: number;
        couponId?: number | null;
        customerId?: number | null;
        orderId?: number | null;
        usedDate?: Date;
    }) {
        this._usageId = data.usageId;
        this._couponId = data.couponId;
        this._customerId = data.customerId;
        this._orderId = data.orderId;
        this._usedDate = data.usedDate || new Date();
    }

    get usageId() { return this._usageId; }
    get couponId() { return this._couponId; }
    get customerId() { return this._customerId; }
    get orderId() { return this._orderId; }
    get usedDate() { return this._usedDate; }

    static fromRow(row: any): CouponUsageEntity {
        return new CouponUsageEntity({
            usageId: row.usageId,
            couponId: row.couponId,
            customerId: row.customerId,
            orderId: row.orderId,
            usedDate: row.usedDate,
        });
    }

    toRow() {
        return {
            couponId: this._couponId,
            customerId: this._customerId,
            orderId: this._orderId,
            usedDate: this._usedDate,
        };
    }
}

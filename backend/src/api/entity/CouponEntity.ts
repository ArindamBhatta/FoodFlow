export default class CouponEntity {
    private _couponId?: number;
    private _couponCode: string;
    private _description?: string | null;
    private _discountType?: string | null;
    private _discountValue: number;
    private _minOrderAmount?: number | null;
    private _maxDiscountAmount?: number | null;
    private _validFrom?: Date | null;
    private _validUntil?: Date | null;
    private _usageLimit?: number | null;
    private _timesUsed: number;
    private _isActive: boolean;

    constructor(data: {
        couponId?: number;
        couponCode: string;
        description?: string | null;
        discountType?: string | null;
        discountValue: number;
        minOrderAmount?: number | null;
        maxDiscountAmount?: number | null;
        validFrom?: Date | null;
        validUntil?: Date | null;
        usageLimit?: number | null;
        timesUsed?: number;
        isActive?: boolean;
    }) {
        this._couponId = data.couponId;
        this._couponCode = data.couponCode;
        this._description = data.description;
        this._discountType = data.discountType;
        this._discountValue = data.discountValue;
        this._minOrderAmount = data.minOrderAmount;
        this._maxDiscountAmount = data.maxDiscountAmount;
        this._validFrom = data.validFrom;
        this._validUntil = data.validUntil;
        this._usageLimit = data.usageLimit;
        this._timesUsed = data.timesUsed ?? 0;
        this._isActive = data.isActive ?? true;
    }

    get couponId() { return this._couponId; }
    get couponCode() { return this._couponCode; }
    get description() { return this._description; }
    get discountType() { return this._discountType; }
    get discountValue() { return this._discountValue; }
    get minOrderAmount() { return this._minOrderAmount; }
    get maxDiscountAmount() { return this._maxDiscountAmount; }
    get validFrom() { return this._validFrom; }
    get validUntil() { return this._validUntil; }
    get usageLimit() { return this._usageLimit; }
    get timesUsed() { return this._timesUsed; }
    get isActive() { return this._isActive; }

    static fromRow(row: any): CouponEntity {
        return new CouponEntity({
            couponId: row.couponId,
            couponCode: row.couponCode,
            description: row.description,
            discountType: row.discountType,
            discountValue: row.discountValue,
            minOrderAmount: row.minOrderAmount,
            maxDiscountAmount: row.maxDiscountAmount,
            validFrom: row.validFrom,
            validUntil: row.validUntil,
            usageLimit: row.usageLimit,
            timesUsed: row.timesUsed,
            isActive: row.isActive,
        });
    }

    toRow() {
        return {
            couponCode: this._couponCode,
            description: this._description,
            discountType: this._discountType,
            discountValue: this._discountValue,
            minOrderAmount: this._minOrderAmount,
            maxDiscountAmount: this._maxDiscountAmount,
            validFrom: this._validFrom,
            validUntil: this._validUntil,
            usageLimit: this._usageLimit,
            timesUsed: this._timesUsed,
            isActive: this._isActive,
        };
    }
}

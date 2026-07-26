export default class ReviewEntity {
    private _reviewId?: number;
    private _customerId?: number | null;
    private _orderId?: number | null;
    private _vendorId?: number | null;
    private _foodId?: number | null;
    private _deliveryPersonId?: number | null;
    private _rating: number;
    private _reviewText?: string | null;
    private _reviewDate: Date;
    private _reviewImages?: string | null;
    private _isVerified: boolean;

    constructor(data: {
        reviewId?: number;
        customerId?: number | null;
        orderId?: number | null;
        vendorId?: number | null;
        foodId?: number | null;
        deliveryPersonId?: number | null;
        rating: number;
        reviewText?: string | null;
        reviewDate?: Date;
        reviewImages?: string | null;
        isVerified?: boolean;
    }) {
        this._reviewId = data.reviewId;
        this._customerId = data.customerId;
        this._orderId = data.orderId;
        this._vendorId = data.vendorId;
        this._foodId = data.foodId;
        this._deliveryPersonId = data.deliveryPersonId;
        this._rating = data.rating;
        this._reviewText = data.reviewText;
        this._reviewDate = data.reviewDate || new Date();
        this._reviewImages = data.reviewImages;
        this._isVerified = data.isVerified ?? false;
    }

    get reviewId() { return this._reviewId; }
    get customerId() { return this._customerId; }
    get orderId() { return this._orderId; }
    get vendorId() { return this._vendorId; }
    get foodId() { return this._foodId; }
    get deliveryPersonId() { return this._deliveryPersonId; }
    get rating() { return this._rating; }
    get reviewText() { return this._reviewText; }
    get reviewDate() { return this._reviewDate; }
    get reviewImages() { return this._reviewImages; }
    get isVerified() { return this._isVerified; }

    static fromRow(row: any): ReviewEntity {
        return new ReviewEntity({
            reviewId: row.reviewId,
            customerId: row.customerId,
            orderId: row.orderId,
            vendorId: row.vendorId,
            foodId: row.foodId,
            deliveryPersonId: row.deliveryPersonId,
            rating: row.rating,
            reviewText: row.reviewText,
            reviewDate: row.reviewDate,
            reviewImages: row.reviewImages,
            isVerified: row.isVerified,
        });
    }

    toRow() {
        return {
            customerId: this._customerId,
            orderId: this._orderId,
            vendorId: this._vendorId,
            foodId: this._foodId,
            deliveryPersonId: this._deliveryPersonId,
            rating: this._rating,
            reviewText: this._reviewText,
            reviewDate: this._reviewDate,
            reviewImages: this._reviewImages,
            isVerified: this._isVerified,
        };
    }
}

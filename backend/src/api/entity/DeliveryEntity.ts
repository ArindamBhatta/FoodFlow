export default class DeliveryEntity {
    private _deliveryId?: number;
    private _orderId?: number | null;
    private _deliveryPersonId?: number | null;
    private _pickupTime?: Date | null;
    private _deliveryTime?: Date | null;
    private _deliveryStatus?: string | null;
    private _deliveryOtp?: string | null;
    private _deliveryInstructions?: string | null;
    private _deliveryRating?: number | null;
    private _deliveryFeedback?: string | null;

    constructor(data: {
        deliveryId?: number;
        orderId?: number | null;
        deliveryPersonId?: number | null;
        pickupTime?: Date | null;
        deliveryTime?: Date | null;
        deliveryStatus?: string | null;
        deliveryOtp?: string | null;
        deliveryInstructions?: string | null;
        deliveryRating?: number | null;
        deliveryFeedback?: string | null;
    }) {
        this._deliveryId = data.deliveryId;
        this._orderId = data.orderId;
        this._deliveryPersonId = data.deliveryPersonId;
        this._pickupTime = data.pickupTime;
        this._deliveryTime = data.deliveryTime;
        this._deliveryStatus = data.deliveryStatus;
        this._deliveryOtp = data.deliveryOtp;
        this._deliveryInstructions = data.deliveryInstructions;
        this._deliveryRating = data.deliveryRating;
        this._deliveryFeedback = data.deliveryFeedback;
    }

    get deliveryId() { return this._deliveryId; }
    get orderId() { return this._orderId; }
    get deliveryPersonId() { return this._deliveryPersonId; }
    get pickupTime() { return this._pickupTime; }
    get deliveryTime() { return this._deliveryTime; }
    get deliveryStatus() { return this._deliveryStatus; }
    get deliveryOtp() { return this._deliveryOtp; }
    get deliveryInstructions() { return this._deliveryInstructions; }
    get deliveryRating() { return this._deliveryRating; }
    get deliveryFeedback() { return this._deliveryFeedback; }

    static fromRow(row: any): DeliveryEntity {
        return new DeliveryEntity({
            deliveryId: row.deliveryId,
            orderId: row.orderId,
            deliveryPersonId: row.deliveryPersonId,
            pickupTime: row.pickupTime,
            deliveryTime: row.deliveryTime,
            deliveryStatus: row.deliveryStatus,
            deliveryOtp: row.deliveryOtp,
            deliveryInstructions: row.deliveryInstructions,
            deliveryRating: row.deliveryRating,
            deliveryFeedback: row.deliveryFeedback,
        });
    }

    toRow() {
        return {
            orderId: this._orderId,
            deliveryPersonId: this._deliveryPersonId,
            pickupTime: this._pickupTime,
            deliveryTime: this._deliveryTime,
            deliveryStatus: this._deliveryStatus,
            deliveryOtp: this._deliveryOtp,
            deliveryInstructions: this._deliveryInstructions,
            deliveryRating: this._deliveryRating,
            deliveryFeedback: this._deliveryFeedback,
        };
    }
}

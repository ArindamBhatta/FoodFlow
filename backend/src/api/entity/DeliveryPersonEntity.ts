export default class DeliveryPersonEntity {
    private _deliveryPersonId?: number;
    private _personId?: number | null;
    private _vehicleType?: string | null;
    private _vehicleNumber?: string | null;
    private _licenseNumber?: string | null;
    private _isAvailable: boolean;
    private _currentLatitude?: number | null;
    private _currentLongitude?: number | null;
    private _totalDeliveries: number;
    private _ratingAverage: number;
    private _joinedDate: Date;

    constructor(data: {
        deliveryPersonId?: number;
        personId?: number | null;
        vehicleType?: string | null;
        vehicleNumber?: string | null;
        licenseNumber?: string | null;
        isAvailable?: boolean;
        currentLatitude?: number | null;
        currentLongitude?: number | null;
        totalDeliveries?: number;
        ratingAverage?: number;
        joinedDate?: Date;
    }) {
        this._deliveryPersonId = data.deliveryPersonId;
        this._personId = data.personId;
        this._vehicleType = data.vehicleType;
        this._vehicleNumber = data.vehicleNumber;
        this._licenseNumber = data.licenseNumber;
        this._isAvailable = data.isAvailable ?? true;
        this._currentLatitude = data.currentLatitude;
        this._currentLongitude = data.currentLongitude;
        this._totalDeliveries = data.totalDeliveries ?? 0;
        this._ratingAverage = data.ratingAverage ?? 0;
        this._joinedDate = data.joinedDate || new Date();
    }

    get deliveryPersonId() { return this._deliveryPersonId; }
    get personId() { return this._personId; }
    get vehicleType() { return this._vehicleType; }
    get vehicleNumber() { return this._vehicleNumber; }
    get licenseNumber() { return this._licenseNumber; }
    get isAvailable() { return this._isAvailable; }
    get currentLatitude() { return this._currentLatitude; }
    get currentLongitude() { return this._currentLongitude; }
    get totalDeliveries() { return this._totalDeliveries; }
    get ratingAverage() { return this._ratingAverage; }
    get joinedDate() { return this._joinedDate; }

    static fromRow(row: any): DeliveryPersonEntity {
        return new DeliveryPersonEntity({
            deliveryPersonId: row.deliveryPersonId,
            personId: row.personId,
            vehicleType: row.vehicleType,
            vehicleNumber: row.vehicleNumber,
            licenseNumber: row.licenseNumber,
            isAvailable: row.isAvailable,
            currentLatitude: row.currentLatitude,
            currentLongitude: row.currentLongitude,
            totalDeliveries: row.totalDeliveries,
            ratingAverage: row.ratingAverage,
            joinedDate: row.joinedDate,
        });
    }

    toRow() {
        return {
            personId: this._personId,
            vehicleType: this._vehicleType,
            vehicleNumber: this._vehicleNumber,
            licenseNumber: this._licenseNumber,
            isAvailable: this._isAvailable,
            currentLatitude: this._currentLatitude,
            currentLongitude: this._currentLongitude,
            totalDeliveries: this._totalDeliveries,
            ratingAverage: this._ratingAverage,
            joinedDate: this._joinedDate,
        };
    }
}

export default class CustomerEntity {
    private _customerId?: number;
    private _personId?: number | null;
    private _loyaltyPoints: number;
    private _preferredCuisine?: string | null;
    private _registrationDate: Date;
    private _isActive: boolean;

    constructor(data: {
        customerId?: number;
        personId?: number | null;
        loyaltyPoints?: number;
        preferredCuisine?: string | null;
        registrationDate?: Date;
        isActive?: boolean;
    }) {
        this._customerId = data.customerId;
        this._personId = data.personId;
        this._loyaltyPoints = data.loyaltyPoints ?? 0;
        this._preferredCuisine = data.preferredCuisine;
        this._registrationDate = data.registrationDate || new Date();
        this._isActive = data.isActive ?? true;
    }

    get customerId() { return this._customerId; }
    get personId() { return this._personId; }
    get loyaltyPoints() { return this._loyaltyPoints; }
    get preferredCuisine() { return this._preferredCuisine; }
    get registrationDate() { return this._registrationDate; }
    get isActive() { return this._isActive; }

    static fromRow(row: any): CustomerEntity {
        return new CustomerEntity({
            customerId: row.customerId,
            personId: row.personId,
            loyaltyPoints: row.loyaltyPoints,
            preferredCuisine: row.preferredCuisine,
            registrationDate: row.registrationDate,
            isActive: row.isActive,
        });
    }

    toRow() {
        return {
            personId: this._personId,
            loyaltyPoints: this._loyaltyPoints,
            preferredCuisine: this._preferredCuisine,
            registrationDate: this._registrationDate,
            isActive: this._isActive,
        };
    }
}

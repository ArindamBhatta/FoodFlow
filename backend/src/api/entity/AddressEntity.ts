export default class AddressEntity {
    private _addressId?: number;
    private _personId?: number | null;
    private _vendorId?: number | null;
    private _addressType?: string | null;
    private _streetAddress: string;
    private _landmark?: string | null;
    private _city: string;
    private _state: string;
    private _pincode: string;
    private _latitude?: number | null;
    private _longitude?: number | null;
    private _isDefault: boolean;

    constructor(data: {
        addressId?: number;
        personId?: number | null;
        vendorId?: number | null;
        addressType?: string | null;
        streetAddress: string;
        landmark?: string | null;
        city: string;
        state: string;
        pincode: string;
        latitude?: number | null;
        longitude?: number | null;
        isDefault?: boolean;
    }) {
        this._addressId = data.addressId;
        this._personId = data.personId;
        this._vendorId = data.vendorId;
        this._addressType = data.addressType;
        this._streetAddress = data.streetAddress;
        this._landmark = data.landmark;
        this._city = data.city;
        this._state = data.state;
        this._pincode = data.pincode;
        this._latitude = data.latitude;
        this._longitude = data.longitude;
        this._isDefault = data.isDefault ?? false;
    }

    get addressId() { return this._addressId; }
    get personId() { return this._personId; }
    get vendorId() { return this._vendorId; }
    get addressType() { return this._addressType; }
    get streetAddress() { return this._streetAddress; }
    get landmark() { return this._landmark; }
    get city() { return this._city; }
    get state() { return this._state; }
    get pincode() { return this._pincode; }
    get latitude() { return this._latitude; }
    get longitude() { return this._longitude; }
    get isDefault() { return this._isDefault; }

    static fromRow(row: any): AddressEntity {
        return new AddressEntity({
            addressId: row.addressId,
            personId: row.personId,
            vendorId: row.vendorId,
            addressType: row.addressType,
            streetAddress: row.streetAddress,
            landmark: row.landmark,
            city: row.city,
            state: row.state,
            pincode: row.pincode,
            latitude: row.latitude,
            longitude: row.longitude,
            isDefault: row.isDefault,
        });
    }

    toRow() {
        return {
            personId: this._personId,
            vendorId: this._vendorId,
            addressType: this._addressType,
            streetAddress: this._streetAddress,
            landmark: this._landmark,
            city: this._city,
            state: this._state,
            pincode: this._pincode,
            latitude: this._latitude,
            longitude: this._longitude,
            isDefault: this._isDefault,
        };
    }
}

export class CreateVendorDTO {
    name!: string;
    address!: string;
    pincode!: string;
    foodType!: string[];
    email!: string;
    password!: string;
    ownerName!: string;
    phone!: string;
    constructor(data: any) {
        Object.assign(this, data);
    }
}

export class LoginVendorDTO {
    email!: string;
    password!: string;
}

export class EditVendorProfileDTO {
    vendorName?: string;
    ownerName?: string;
    vendorDescription?: string;
    cuisineType?: string;
    openingTime?: string;
    closingTime?: string;
    avgPreparationTime?: number;
}

export class VendorResponseDTO {
    vendorId?: number;
    vendorName: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    constructor(vendor: any) {
        this.vendorId = vendor.vendorId;
        this.vendorName = vendor.vendorName;
        this.ownerName = vendor.ownerName;
        this.ownerEmail = vendor.ownerEmail;
        this.ownerPhone = vendor.ownerPhone;
    }
}

export interface VendorPayload {
    _id: string;
    role: 'vendor';
    email: string;
    verified: boolean;
}

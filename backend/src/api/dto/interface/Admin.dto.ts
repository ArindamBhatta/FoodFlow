export class CreateAdminDTO {
    fullName!: string;
    email!: string;
    password!: string;
    phoneNumber!: string;
    constructor(data: any) {
        Object.assign(this, data);
    }
}

export class LoginAdminDTO {
    email!: string;
    password!: string;
}

export class AdminResponseDTO {
    adminId?: number;
    fullName: string;
    email: string;
    role: string;
    constructor(admin: any) {
        this.adminId = admin.adminId;
        this.fullName = admin.fullName;
        this.email = admin.email;
        this.role = admin.role;
    }
}

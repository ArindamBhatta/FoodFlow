export default class AdminEntity {
    private _adminId?: number;
    private _personId: number;
    private _role: string;
    private _isActive: boolean;

    // From joined person table
    private _fullName?: string;
    private _email?: string;
    private _phoneNumber?: string | null;
    private _password?: string | null;
    private _salt?: string | null;

    constructor(data: {
        adminId?: number;
        personId: number;
        role?: string;
        isActive?: boolean;
        fullName?: string;
        email?: string;
        phoneNumber?: string | null;
        password?: string | null;
        salt?: string | null;
    }) {
        this._adminId = data.adminId;
        this._personId = data.personId;
        this._role = data.role ?? 'admin';
        this._isActive = data.isActive ?? true;
        this._fullName = data.fullName;
        this._email = data.email;
        this._phoneNumber = data.phoneNumber;
        this._password = data.password;
        this._salt = data.salt;
    }

    get adminId() { return this._adminId; }
    get personId() { return this._personId; }
    get role() { return this._role; }
    get isActive() { return this._isActive; }
    get fullName() { return this._fullName; }
    get email() { return this._email; }
    get phoneNumber() { return this._phoneNumber; }
    get password() { return this._password; }
    get salt() { return this._salt; }

    static fromRow(row: any): AdminEntity {
        return new AdminEntity({
            adminId: row.adminId,
            personId: row.personId,
            role: row.role,
            isActive: row.isActive,
        });
    }

    toRow() {
        return {
            personId: this._personId,
            role: this._role,
            isActive: this._isActive,
        };
    }
}

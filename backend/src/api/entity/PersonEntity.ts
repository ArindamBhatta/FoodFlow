export default class PersonEntity {
    private _personId?: number;
    private _fullName: string;
    private _email: string;
    private _phoneNumber?: string | null;
    private _dateOfBirth?: string | null;
    private _profileImageUrl?: string | null;
    private _accessToken?: string | null;
    private _refreshToken?: string | null;
    private _password?: string | null;
    private _salt?: string | null;
    private _otp?: number | null;
    private _otpExpiry?: Date | null;
    private _verified: boolean;
    private _createdAt: Date;

    constructor(data: {
        personId?: number;
        fullName: string;
        email: string;
        phoneNumber?: string | null;
        dateOfBirth?: string | null;
        profileImageUrl?: string | null;
        accessToken?: string | null;
        refreshToken?: string | null;
        password?: string | null;
        salt?: string | null;
        otp?: number | null;
        otpExpiry?: Date | null;
        verified?: boolean;
        createdAt?: Date;
    }) {
        this._personId = data.personId;
        this._fullName = data.fullName;
        this._email = data.email;
        this._phoneNumber = data.phoneNumber;
        this._dateOfBirth = data.dateOfBirth;
        this._profileImageUrl = data.profileImageUrl;
        this._accessToken = data.accessToken;
        this._refreshToken = data.refreshToken;
        this._password = data.password;
        this._salt = data.salt;
        this._otp = data.otp;
        this._otpExpiry = data.otpExpiry;
        this._verified = data.verified ?? false;
        this._createdAt = data.createdAt || new Date();
    }

    // Getters
    get personId() { return this._personId; }
    get fullName() { return this._fullName; }
    get email() { return this._email; }
    get phoneNumber() { return this._phoneNumber; }
    get dateOfBirth() { return this._dateOfBirth; }
    get profileImageUrl() { return this._profileImageUrl; }
    get accessToken() { return this._accessToken; }
    get refreshToken() { return this._refreshToken; }
    get password() { return this._password; }
    get salt() { return this._salt; }
    get otp() { return this._otp; }
    get otpExpiry() { return this._otpExpiry; }
    get verified() { return this._verified; }
    get createdAt() { return this._createdAt; }

    // Convert DB Row to Entity
    static fromRow(row: any): PersonEntity {
        return new PersonEntity({
            personId: row.personId,
            fullName: row.fullName,
            email: row.email,
            phoneNumber: row.phoneNumber,
            dateOfBirth: row.dateOfBirth,
            profileImageUrl: row.profileImageUrl,
            accessToken: row.accessToken,
            refreshToken: row.refreshToken,
            password: row.password,
            salt: row.salt,
            otp: row.otp,
            otpExpiry: row.otpExpiry,
            verified: row.verified,
            createdAt: row.createdAt,
        });
    }

    // Convert Entity to DB Row payload
    toRow() {
        return {
            fullName: this._fullName,
            email: this._email,
            phoneNumber: this._phoneNumber,
            dateOfBirth: this._dateOfBirth,
            profileImageUrl: this._profileImageUrl,
            accessToken: this._accessToken,
            refreshToken: this._refreshToken,
            password: this._password,
            salt: this._salt,
            otp: this._otp,
            otpExpiry: this._otpExpiry,
            verified: this._verified,
        };
    }
}

export default class VendorEntity {
  private _vendorId?: number;
  private _personId?: number | null;
  private _vendorName: string;
  private _vendorDescription?: string | null;
  private _cuisineType?: string | null;
  private _openingTime?: string | null;
  private _closingTime?: string | null;
  private _avgPreparationTime?: number | null;
  private _vendorLogoUrl?: string | null;
  private _isActive: boolean;
  private _gstNumber?: string | null;
  private _fssaiLicense?: string | null;
  private _ratingAverage: number;
  private _totalReviews: number;
  private _ownerName?: string | null;
  private _ownerEmail?: string | null;
  private _ownerPhone?: string | null;

  // Authentication fields mirrored from Person
  private _password?: string | null;
  private _salt?: string | null;
  private _accessToken?: string | null;
  private _refreshToken?: string | null;
  private _verified: boolean;

  constructor(data: {
    vendorId?: number;
    personId?: number | null;
    vendorName: string;
    vendorDescription?: string | null;
    cuisineType?: string | null;
    openingTime?: string | null;
    closingTime?: string | null;
    avgPreparationTime?: number | null;
    vendorLogoUrl?: string | null;
    isActive?: boolean | null;
    gstNumber?: string | null;
    fssaiLicense?: string | null;
    ratingAverage?: number | null;
    totalReviews?: number | null;
    ownerName?: string | null;
    ownerEmail?: string | null;
    ownerPhone?: string | null;
    password?: string | null;
    salt?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    verified?: boolean;
  }) {
    this._vendorId = data.vendorId;
    this._personId = data.personId;
    this._vendorName = data.vendorName;
    this._vendorDescription = data.vendorDescription;
    this._cuisineType = data.cuisineType;
    this._openingTime = data.openingTime;
    this._closingTime = data.closingTime;
    this._avgPreparationTime = data.avgPreparationTime;
    this._vendorLogoUrl = data.vendorLogoUrl;
    this._isActive = data.isActive ?? true;
    this._gstNumber = data.gstNumber;
    this._fssaiLicense = data.fssaiLicense;
    this._ratingAverage = data.ratingAverage ?? 0;
    this._totalReviews = data.totalReviews ?? 0;
    this._ownerName = data.ownerName;
    this._ownerEmail = data.ownerEmail;
    this._ownerPhone = data.ownerPhone;
    this._password = data.password;
    this._salt = data.salt;
    this._accessToken = data.accessToken;
    this._refreshToken = data.refreshToken;
    this._verified = data.verified ?? false;
  }

  get vendorId() { return this._vendorId; }
  get personId() { return this._personId; }
  get vendorName() { return this._vendorName; }
  get vendorDescription() { return this._vendorDescription; }
  get cuisineType() { return this._cuisineType; }
  get openingTime() { return this._openingTime; }
  get closingTime() { return this._closingTime; }
  get avgPreparationTime() { return this._avgPreparationTime; }
  get vendorLogoUrl() { return this._vendorLogoUrl; }
  get isActive() { return this._isActive; }
  get gstNumber() { return this._gstNumber; }
  get fssaiLicense() { return this._fssaiLicense; }
  get ratingAverage() { return this._ratingAverage; }
  get totalReviews() { return this._totalReviews; }
  get ownerName() { return this._ownerName; }
  get ownerEmail() { return this._ownerEmail; }
  get ownerPhone() { return this._ownerPhone; }
  get password() { return this._password; }
  get salt() { return this._salt; }
  get accessToken() { return this._accessToken; }
  get refreshToken() { return this._refreshToken; }
  get verified() { return this._verified; }

  //similar to formJson
  static fromRow(row: any): VendorEntity {
    return new VendorEntity({
      vendorId: row.vendorId,
      personId: row.personId,
      vendorName: row.vendorName,
      vendorDescription: row.vendorDescription,
      cuisineType: row.cuisineType,
      openingTime: row.openingTime,
      closingTime: row.closingTime,
      avgPreparationTime: row.avgPreparationTime,
      vendorLogoUrl: row.vendorLogoUrl,
      isActive: row.isActive,
      gstNumber: row.gstNumber,
      fssaiLicense: row.fssaiLicense,
      ratingAverage: row.ratingAverage,
      totalReviews: row.totalReviews,
    });
  }
  //similar to toJson()
  toRow() {
    return {
      personId: this._personId,
      vendorName: this._vendorName,
      vendorDescription: this._vendorDescription,
      cuisineType: this._cuisineType,
      openingTime: this._openingTime,
      closingTime: this._closingTime,
      avgPreparationTime: this._avgPreparationTime,
      vendorLogoUrl: this._vendorLogoUrl,
      isActive: this._isActive,
      gstNumber: this._gstNumber,
      fssaiLicense: this._fssaiLicense,
      ratingAverage: this._ratingAverage,
      totalReviews: this._totalReviews,
    };
  }
}

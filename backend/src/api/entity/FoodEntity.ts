export default class FoodEntity {
    private _foodId?: number;
    private _vendorId?: number | null;
    private _foodName: string;
    private _foodDescription?: string | null;
    private _categoryId?: number | null;
    private _price: number;
    private _discountPercentage: number;
    private _foodImageUrl?: string | null;
    private _isVegetarian: boolean;
    private _isVegan: boolean;
    private _isAvailable: boolean;
    private _preparationTimeMinutes?: number | null;
    private _calories?: number | null;
    private _ingredients?: string | null;
    private _spiceLevel?: string | null;
    private _servingSize?: string | null;
    private _createdAt: Date;

    constructor(data: {
        foodId?: number;
        vendorId?: number | null;
        foodName: string;
        foodDescription?: string | null;
        categoryId?: number | null;
        price: number;
        discountPercentage?: number;
        foodImageUrl?: string | null;
        isVegetarian?: boolean;
        isVegan?: boolean;
        isAvailable?: boolean;
        preparationTimeMinutes?: number | null;
        calories?: number | null;
        ingredients?: string | null;
        spiceLevel?: string | null;
        servingSize?: string | null;
        createdAt?: Date;
    }) {
        this._foodId = data.foodId;
        this._vendorId = data.vendorId;
        this._foodName = data.foodName;
        this._foodDescription = data.foodDescription;
        this._categoryId = data.categoryId;
        this._price = data.price;
        this._discountPercentage = data.discountPercentage ?? 0;
        this._foodImageUrl = data.foodImageUrl;
        this._isVegetarian = data.isVegetarian ?? false;
        this._isVegan = data.isVegan ?? false;
        this._isAvailable = data.isAvailable ?? true;
        this._preparationTimeMinutes = data.preparationTimeMinutes;
        this._calories = data.calories;
        this._ingredients = data.ingredients;
        this._spiceLevel = data.spiceLevel;
        this._servingSize = data.servingSize;
        this._createdAt = data.createdAt || new Date();
    }

    get foodId() { return this._foodId; }
    get vendorId() { return this._vendorId; }
    get foodName() { return this._foodName; }
    get foodDescription() { return this._foodDescription; }
    get categoryId() { return this._categoryId; }
    get price() { return this._price; }
    get discountPercentage() { return this._discountPercentage; }
    get foodImageUrl() { return this._foodImageUrl; }
    get isVegetarian() { return this._isVegetarian; }
    get isVegan() { return this._isVegan; }
    get isAvailable() { return this._isAvailable; }
    get preparationTimeMinutes() { return this._preparationTimeMinutes; }
    get calories() { return this._calories; }
    get ingredients() { return this._ingredients; }
    get spiceLevel() { return this._spiceLevel; }
    get servingSize() { return this._servingSize; }
    get createdAt() { return this._createdAt; }

    static fromRow(row: any): FoodEntity {
        return new FoodEntity({
            foodId: row.foodId,
            vendorId: row.vendorId,
            foodName: row.foodName,
            foodDescription: row.foodDescription,
            categoryId: row.categoryId,
            price: row.price,
            discountPercentage: row.discountPercentage,
            foodImageUrl: row.foodImageUrl,
            isVegetarian: row.isVegetarian,
            isVegan: row.isVegan,
            isAvailable: row.isAvailable,
            preparationTimeMinutes: row.preparationTimeMinutes,
            calories: row.calories,
            ingredients: row.ingredients,
            spiceLevel: row.spiceLevel,
            servingSize: row.servingSize,
            createdAt: row.createdAt,
        });
    }

    toRow() {
        return {
            vendorId: this._vendorId,
            foodName: this._foodName,
            foodDescription: this._foodDescription,
            categoryId: this._categoryId,
            price: this._price,
            discountPercentage: this._discountPercentage,
            foodImageUrl: this._foodImageUrl,
            isVegetarian: this._isVegetarian,
            isVegan: this._isVegan,
            isAvailable: this._isAvailable,
            preparationTimeMinutes: this._preparationTimeMinutes,
            calories: this._calories,
            ingredients: this._ingredients,
            spiceLevel: this._spiceLevel,
            servingSize: this._servingSize,
        };
    }
}

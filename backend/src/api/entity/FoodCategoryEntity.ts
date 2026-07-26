export default class FoodCategoryEntity {
    private _categoryId?: number;
    private _categoryName: string;
    private _categoryDescription?: string | null;
    private _categoryImageUrl?: string | null;
    private _displayOrder: number;

    constructor(data: {
        categoryId?: number;
        categoryName: string;
        categoryDescription?: string | null;
        categoryImageUrl?: string | null;
        displayOrder?: number;
    }) {
        this._categoryId = data.categoryId;
        this._categoryName = data.categoryName;
        this._categoryDescription = data.categoryDescription;
        this._categoryImageUrl = data.categoryImageUrl;
        this._displayOrder = data.displayOrder ?? 0;
    }

    get categoryId() { return this._categoryId; }
    get categoryName() { return this._categoryName; }
    get categoryDescription() { return this._categoryDescription; }
    get categoryImageUrl() { return this._categoryImageUrl; }
    get displayOrder() { return this._displayOrder; }

    static fromRow(row: any): FoodCategoryEntity {
        return new FoodCategoryEntity({
            categoryId: row.categoryId,
            categoryName: row.categoryName,
            categoryDescription: row.categoryDescription,
            categoryImageUrl: row.categoryImageUrl,
            displayOrder: row.displayOrder,
        });
    }

    toRow() {
        return {
            categoryName: this._categoryName,
            categoryDescription: this._categoryDescription,
            categoryImageUrl: this._categoryImageUrl,
            displayOrder: this._displayOrder,
        };
    }
}

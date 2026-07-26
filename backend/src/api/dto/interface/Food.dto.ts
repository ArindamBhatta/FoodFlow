export class CreateFoodInput {
    name!: string;
    description!: string;
    categoryId!: number;
    foodType!: string;
    readyTime!: number;
    price!: number;
    constructor(data: any) {
        Object.assign(this, data);
    }
}

export interface FoodResponse {
    id?: number;
    name: string;
    description: string;
    category?: any;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: string[];
}

import FoodEntity from "../../entity/FoodEntity";

export default interface IFoodRepo {
  addFood(
    vendorId: number,
    input: any,
    imageUrls: string[]
  ): Promise<FoodEntity>;
  getFoods(vendorId: number): Promise<FoodEntity[]>;
  getFoodById(foodId: number): Promise<FoodEntity | null>;
}

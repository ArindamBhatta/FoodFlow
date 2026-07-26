import FoodEntity from "../../entity/FoodEntity";
import { CreateFoodInput } from "../../dto/interface/Food.dto";

export default interface IFoodService {
  addFood(
    vendorId: number,
    input: CreateFoodInput,
    files: any[]
  ): Promise<FoodEntity>;
  getFoods(vendorId: number): Promise<FoodEntity[]>;
}

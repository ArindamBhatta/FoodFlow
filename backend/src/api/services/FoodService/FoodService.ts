import VendorRepo from "../../repos/VendorRepo/VendorRepo";
import FoodRepo from "../../repos/FoodRepo/FoodRepo";
import FoodEntity from "../../entity/FoodEntity";
import { CreateFoodInput } from "../../dto/interface/Food.dto";
import IFoodService from "./FoodService.interface";

export default class FoodService implements IFoodService {
  private vendorRepo: VendorRepo;
  private foodRepo: FoodRepo;

  constructor(vendorRepo: VendorRepo, foodRepo: FoodRepo) {
    this.vendorRepo = vendorRepo;
    this.foodRepo = foodRepo;
  }

  addFood = async (
    vendorId: number,
    input: CreateFoodInput,
    files: any[]
  ): Promise<FoodEntity> => {
    try {
      const vendor = await this.vendorRepo.findVendor({ vendorId });
      if (!vendor) {
        throw new Error("Vendor not found");
      }

      // Mock image upload or use utility
      const imageUrls: string[] = ["http://example.com/food.jpg"];

      const createdFood = await this.foodRepo.addFood(vendorId, input, imageUrls);
      return createdFood;
    } catch (error) {
      console.error("Error in FoodService.addFood:", error);
      throw error;
    }
  };

  getFoods = async (vendorId: number): Promise<FoodEntity[]> => {
    try {
      const vendor = await this.vendorRepo.findVendor({ vendorId });
      if (!vendor) {
        throw new Error("Vendor not found");
      }
      return await this.foodRepo.getFoods(vendorId);
    } catch (error) {
      console.error("Error in FoodService.getFoods:", error);
      throw error;
    }
  };
}

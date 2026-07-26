import { FoodDAO } from "../../../infrastructure/daos/FoodDAO";
import { VendorDAO } from "../../../infrastructure/daos/VendorDAO";
import FoodEntity from "../../entity/FoodEntity";
import IFoodRepo from "./FoodRepo.interface";

export default class FoodRepo implements IFoodRepo {
  private foodDao: FoodDAO;
  private vendorDao: VendorDAO;

  constructor(foodDao: FoodDAO, vendorDao: VendorDAO) {
    this.foodDao = foodDao;
    this.vendorDao = vendorDao;
  }

  addFood = async (
    vendorId: number,
    input: any,
    imageUrls: string[]
  ): Promise<FoodEntity> => {
    try {
      // Create food
      const rawData = {
        vendorId,
        foodName: input.name,
        foodDescription: input.description,
        categoryId: input.categoryId, // assuming input has numeric categoryId
        price: input.price,
        foodImageUrl: imageUrls[0], // Store first image as URL for now
        // other fields...
      };

      const savedRow = await this.foodDao.create(rawData);
      return FoodEntity.fromRow(savedRow);
    } catch (error) {
      console.error("Error in FoodRepo.addFood:", error);
      throw error;
    }
  };

  getFoods = async (vendorId: number): Promise<FoodEntity[]> => {
    try {
      const rows = await this.foodDao.getByVendorId(vendorId);
      return rows.map((row) => FoodEntity.fromRow(row));
    } catch (error) {
      console.error("Error in FoodRepo.getFoods:", error);
      throw error;
    }
  };

  getFoodById = async (foodId: number): Promise<FoodEntity | null> => {
    try {
      const row = await this.foodDao.getById(foodId);
      return row ? FoodEntity.fromRow(row) : null;
    } catch (error) {
      console.error("Error in FoodRepo.getFoodById:", error);
      throw error;
    }
  };
}

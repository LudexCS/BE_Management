import {Discount} from "../entity/discount.entity";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";

const discountRepo: Repository<Discount> = AppDataSource.getRepository(Discount);

export async function saveDiscount(discount: Discount) {
    try {
        return await discountRepo.save(discount);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to save discount:', error.message);
        }
        else {
            console.error('Failed to save discount: Unknown Error');
        }
        throw new Error('Failed to save discount to database');
    }
}
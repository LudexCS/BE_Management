import AppDataSource from "../config/mysql.config";
import {GameRequirement} from "../entity/gameRequirement.entity";
import {Repository} from "typeorm";

const gameRequirementRepo: Repository<GameRequirement> = AppDataSource.getRepository(GameRequirement);

export const saveGameRequirement = async (gameRequirement: GameRequirement) => {
    try {
        return await gameRequirementRepo.save(gameRequirement);
    } catch (error) {
        console.error('Failed to save game requirement:', error);
        throw new Error('Failed to save game requirement to database');
    }
}

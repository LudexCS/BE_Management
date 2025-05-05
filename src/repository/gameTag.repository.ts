import AppDataSource from "../config/mysql.config";
import {GameTag} from "../entity/gameTag.entity";
import {Repository} from "typeorm";

const gameTagRepo: Repository<GameTag> = AppDataSource.getRepository(GameTag);

export const saveGameTag = async (gameTag: GameTag) => {
    try {
        return await gameTagRepo.save(gameTag);
    } catch (error) {
        console.error('Failed to save game tag:', error);
        throw new Error('Failed to save game tag to database');
    }
}
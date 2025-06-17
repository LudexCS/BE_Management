import AppDataSource from "../config/mysql.config";
import {OriginGame} from "../entity/originGame.entity";
import {Repository} from "typeorm";

const originGameRepo: Repository<OriginGame> = AppDataSource.getRepository(OriginGame);

export const saveOriginGame = async (originGame: OriginGame) => {
    try {
        return await originGameRepo.save(originGame);
    } catch (error) {
        console.error('Failed to save origin game:', error);
        throw new Error('Failed to save origin game to database');
    }
}

export const findVariantGameIdByOriginGameId = async (originGameId: number) => {
    const variantGameIds = await originGameRepo.find({
        select: ['gameId'],
        where: { originGameId: originGameId }
    });
    return variantGameIds.map(variantGameId => variantGameId.gameId);
}
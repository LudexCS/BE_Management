import AppDataSource from "../config/mysql.config";
import {Repository} from "typeorm";
import {GameImageUrl} from "../entity/gameImageUrl.entity";

const gameImageUrlRepo: Repository<GameImageUrl> = AppDataSource.getRepository(GameImageUrl);

export const saveGameImageUrl = async (gameImageUrl: GameImageUrl): Promise<GameImageUrl> => {
    try {
        return await gameImageUrlRepo.save(gameImageUrl);
    } catch (error) {
        console.error('Failed to save game image URL:', error);
        throw new Error('Failed to save game image URL to database');
    }
};

export const findImageURLwithGameId = async(gameId: number): Promise<string[]> =>{
    try{
        const imageRows = await gameImageUrlRepo.find({
            select: [ 'url' ],
            where: { gameId: gameId },
        });

        return imageRows.map(img => img.url);
    } catch(err){
        throw err;
    }
};

export const deleteGameImageUrlsByGameId = async (gameId: number) => {
    await gameImageUrlRepo.delete({ gameId });
};

export const findGameImageUrlsByGameId = async (
    gameId: number
): Promise<{ url: string; key: string }[]> => {
    return await gameImageUrlRepo.find({
        where: { gameId },
        select: ["url", "key"]
    });
};

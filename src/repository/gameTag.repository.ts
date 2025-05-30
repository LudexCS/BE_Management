import AppDataSource from "../config/mysql.config";
import {Repository} from "typeorm";
import {GameTag} from "../entity/gameTag.entity";

const gameTagRepo: Repository<GameTag> = AppDataSource.getRepository(GameTag);

export const saveGameTag = async (gameTag: GameTag) => {
    try {
        return await gameTagRepo.save(gameTag);
    } catch (error) {
        console.error('Failed to save game tag:', error);
        throw new Error('Failed to save game tag to database');
    }
}

export const findTagByGameId = async(gameId: number): Promise<string[]> =>{
    try{
        const tagRows = await gameTagRepo
            .createQueryBuilder('game_tag')
            .leftJoin('tag', 'tag', 'tag.id = game_tag.tag_id')
            .select('tag.name', 'name')
            .where('game_tag.game_id = :gameId', { gameId })
            .orderBy('game_tag.priority', 'ASC')
            .getRawMany();

        return tagRows.map(tag => tag.name);
    } catch(err){
        throw err;
    }
};

export const deleteGameTagsByGameId = async (gameId: number) => {
    await gameTagRepo.delete({ gameId });
};
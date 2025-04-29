import {Repository} from "typeorm";
import {GameTag} from "../entity/gameTag.entity";
import AppDataSource from "../config/mysql.config";


const gameTagRepo: Repository<GameTag> = AppDataSource.getRepository(GameTag);


export const findTagWithGameId = async(gameId: number): Promise<string[]> =>{
    try{
        const tagRows = await gameTagRepo
            .createQueryBuilder('game_tag')
            .leftJoinAndSelect('game_tag.tag', 'tag')
            .where('game_tag.game_id = :gameId', { gameId })
            .orderBy('game_tag.priority', 'ASC')
            .getMany();

        const tags = tagRows.map(gt => gt.tag.name);
        return tags;
    } catch(err){
        throw err;
    }
}

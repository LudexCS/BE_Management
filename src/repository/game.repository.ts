import AppDataSource from "../config/mysql.config";
import { Game } from "../entity/game.entity"
import { Repository } from "typeorm";

const gameRepo: Repository<Game> = AppDataSource.getRepository(Game);

export const findGameList = async(limit: number, offset: number, sort: 'popularity' | 'latest' | 'download_times' = 'popularity'): Promise<Game[]> =>{
    let orderField: string;
    switch (sort) {
        case 'latest':
            orderField = 'game.registered_at';
            break;
        case 'download_times':
            orderField = 'game.download_times';
            break;
        case 'popularity':
        default:
            orderField = 'game.popularity';
            break;
    }
    return await gameRepo.createQueryBuilder('game')
        .select(['game.id', 'game.title', 'game.thumnail_url']) // 최소 필드만
        .orderBy(orderField, 'DESC')
        .offset(offset)
        .limit(limit)
        .getRawMany();
};
}

export const findOriginGameList = async (
    gameId: number
): Promise<{ title: string; thumnail_url: string }[]> => {
    return gameRepo.createQueryBuilder('game')
        .where(qb => {
            const subQuery = qb
                .subQuery()
                .select('og.origin_game_id')
                .from('origin_game', 'og')
                .where('og.game_id = :gameId')
                .getQuery();
            return 'game.id IN ' + subQuery;
        })
        .setParameter('gameId', gameId)
        .select(['game.title AS title', 'game.thumnail_url AS thumnail_url'])
        .getRawMany();
};


export const findVarientGameList = async (
    gameId: number
): Promise<{ title: string; thumnail_url: string }[]> => {
    return gameRepo.createQueryBuilder('game')
        .where(qb => {
            const subQuery = qb
                .subQuery()
                .select('og.game_id')
                .from('origin_game', 'og')
                .where('og.origin_id = :gameId')
                .getQuery();
            return 'game.id IN ' + subQuery;
        })
        .setParameter('gameId', gameId)
        .select(['game.title AS title', 'game.thumnail_url AS thumnail_url'])
        .getRawMany();
};
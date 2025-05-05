import AppDataSource from "../config/mysql.config";
import { Game } from "../entity/game.entity"
import { Repository } from "typeorm";
import { GameListRequestDto} from "../dto/gameListRequest.dto";

const gameRepo: Repository<Game> = AppDataSource.getRepository(Game);

/**
 * Saves a new game entity to the database
 * @param game - The game entity to be saved
 * @returns Promise<number> The ID of the saved game entity
 * @throws Error if saving the game metadata fails
 */
export const saveGame = async(game: Game) => {
    try {
        // id 반환. 다른 엔티티 저장 시 필요.
        return (await gameRepo.save(game)).id;
    } catch (error) {
        console.error('Failed to save game metadata:', error);
        throw new Error('Failed to save game metadata to database');
    }
}

export const findGameList = async(gameListRequestDto: GameListRequestDto): Promise<Game[]> =>{
    let orderField: string;
    switch (gameListRequestDto.sort) {
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
        .offset((gameListRequestDto.page - 1) * gameListRequestDto.limit)
        .limit(gameListRequestDto.limit)
        .getRawMany();
};

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
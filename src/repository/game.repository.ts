import AppDataSource from "../config/mysql.config";
import { Game } from "../entity/game.entity"
import { Repository } from "typeorm";
import { GameListRequestDto} from "../dto/gameListRequest.dto";
import {GameTempDetailDto} from "../dto/gameTempDetail.dto";

const gameRepo: Repository<Game> = AppDataSource.getRepository(Game);

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

export const findGameWithTag = async(tags: string[])=>{
    const tagCount = tags.length;

    const result = await gameRepo
        .createQueryBuilder('game')
        .innerJoin('game_tag', 'gt', 'gt.game_id = game.id')
        .innerJoin('tag', 'tag', 'tag.id = gt.tag_id')
        .where('tag.name IN (:...tagNames)', { tags })
        .groupBy('game.id')
        .having('COUNT(DISTINCT tag.id) = :tagCount', { tagCount })
        .select(['game.title AS title', 'game.thumnail_url AS thumnail_url'])
        .getRawMany();

    return result;
}

export const findGameDetailWithGameId = async(gameId: number): Promise<GameTempDetailDto> =>{
    try{
        const gameDetails = await gameRepo.findOne({
            select: [
                'id',
                'title',
                'userId',
                'price',
                'thumnailUrl',
                'description',
                'registeredAt',
                'updatedAt'
            ],
            where: { id: gameId },
        });
        if(!gameDetails){
            throw new Error("게임 찾기 실패");
        }
        return gameDetails;
    } catch(err){
        throw err;
    }
}

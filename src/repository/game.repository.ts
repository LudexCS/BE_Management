import AppDataSource from "../config/mysql.config";
import { Game } from "../entity/game.entity"
import { Repository } from "typeorm";
import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { GameTempDetailDto } from "../dto/gameTempDetail.dto";
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

/**
 * Updates specific fields of a game entity
 * @param gameId - The ID of the game to update
 * @param partialUpdate - An object containing the fields to update
 * @returns Promise<void>
 * @throws Error if update fails
 */
export const updateGameFields = async (
    gameId: number,
    partialUpdate: Partial<Game>
): Promise<void> => {
    try {
        await gameRepo.update({ id: gameId }, partialUpdate);
    } catch (error) {
        console.error("Failed to update game fields:", error);
        throw new Error("Failed to update game fields in database");
    }
};

export const findGameList = async(gameListRequestDto: GameListRequestDto): Promise<Game[]> =>{
    return await gameRepo.createQueryBuilder('game')
        .select(['game.id AS id', 'game.title AS title', 'game.thumbnail_url AS thumbnailUrl', 'game.item_id AS itemId'])
        .orderBy('download_times', 'DESC')
        .offset((gameListRequestDto.page - 1) * gameListRequestDto.limit)
        .limit(gameListRequestDto.limit)
        .getRawMany();
};

export const findOriginGameList = async (
    gameId: number
): Promise<{ gameId: number; title: string; thumbnailUrl: string }[]> => {
    return gameRepo
        .createQueryBuilder('game')
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
        .select([
            'game.id AS gameId',
            'game.title AS title',
            'game.thumbnail_url AS thumbnailUrl'
        ])
        .getRawMany();
};

export const findVarientGameList = async (
    gameId: number
): Promise<{ gameId: number; title: string; thumbnailUrl: string }[]> => {
    return gameRepo
        .createQueryBuilder('game')
        .where(qb => {
            const subQuery = qb
                .subQuery()
                .select('og.game_id')
                .from('origin_game', 'og')
                .where('og.origin_game_id = :gameId')
                .getQuery();
            return 'game.id IN ' + subQuery;
        })
        .setParameter('gameId', gameId)
        .select([
            'game.id AS gameId',
            'game.title AS title',
            'game.thumbnail_url AS thumbnailUrl'
        ])
        .getRawMany();
};

export const isGameExist = async (id: number): Promise<boolean> => {
    return await gameRepo.exists({
        where: { id: id }
    });
}

export const findGameWithTag = async(tags: string[])=>{
    const tagCount = tags.length;

    const result = await gameRepo
        .createQueryBuilder('game')
        .innerJoin('game_tag', 'gt', 'gt.game_id = game.id')
        .innerJoin('tag', 'tag', 'tag.id = gt.tag_id')
        .where('tag.name IN (:...tagNames)', { tagNames: tags })
        .groupBy('game.id')
        .having('COUNT(DISTINCT tag.id) = :tagCount', { tagCount })
        .select(['game.id AS game_id', 'game.title AS title', 'game.thumbnail_url AS thumbnail_url', 'game.item_id AS item_id'])
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
                'thumbnailUrl',
                'description',
                'downloadTimes',
                'itemId',
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

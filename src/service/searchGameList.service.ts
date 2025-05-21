import {GamesListDto} from "../dto/gamesListDto";
import {searchGameByKeyword} from "../repository/game.repository";
import {findTagByGameId} from "../repository/gameTag.repository";

export const searchGameByChoseongService = async (keyword: string): Promise<GamesListDto[]> => {
    // 게임 titleChoseong + 태그 nameChoseong 결과를 append해 return.
}

export const searchGameService = async ( keyword: string ): Promise<GamesListDto[]> => {
    // 게임 title + 게임 titleKo + 태그 name + 태그 nameKo 결과를 append해 return.
    const searchedGameRows = await searchGameByKeyword(keyword);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                tags: allTags
            };
        })
    );
    return games;
};
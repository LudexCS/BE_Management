import {GamesListDto} from "../dto/gamesList.dto";
import {searchGameByKeyword} from "../repository/game.repository";
import {findTagByGameId} from "../repository/gameTag.repository";

export const searchGameService = async (
    keyword: string
): Promise<GamesListDto[]> => {
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
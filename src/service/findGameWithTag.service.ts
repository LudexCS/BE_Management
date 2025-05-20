import { findGameWithTag } from '../repository/game.repository'
import {GamesListDto} from "../dto/gamesList.dto";
import {findTagByGameId} from "../repository/gameTag.repository";

export const findGameWithTagService = async (
    tags: string[]
): Promise<GamesListDto[]> => {
    const taggedGameRows = await findGameWithTag(tags);

    const games: GamesListDto[] = await Promise.all(
        taggedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                tags: allTags,
            };
        })
    );
    return games;
};

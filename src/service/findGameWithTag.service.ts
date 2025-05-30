import { findGameWithTag } from '../repository/game.repository'
import {GamesListDto} from "../dto/gamesList.dto";
import {findTagByGameId} from "../repository/gameTag.repository";

export const findGameWithTagService = async (
    tags: string[], isAdmin: boolean
) => {
    const taggedGameRows = await findGameWithTag(tags, isAdmin);

    const games: GamesListDto[] = await Promise.all(
        taggedGameRows.map(async (game: any) => {
            const allTags = await findTagByGameId(game.id);
            const baseDto: GamesListDto = {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };

            if (isAdmin) {
                // isBlocked가 존재할 경우에만 포함
                return {
                    ...baseDto,
                    isBlocked: game.isBlocked,
                };
            }

            return baseDto;
        })
    );

    return games;
};

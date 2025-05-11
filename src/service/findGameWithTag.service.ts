import { findGameWithTag } from '../repository/game.repository'
import {getPresignedUrl} from "./s3.service";
import {GamesByTagDto} from "../dto/gamesByTag.dto";
import {findTagByGameId} from "../repository/gameTag.repository";

export const findGameWithTagService = async (
    tags: string[]
): Promise<GamesByTagDto[]> => {
    try {
        const taggedGameRows = await findGameWithTag(tags);

        const games: GamesByTagDto[] = await Promise.all(
            taggedGameRows.map(async (game) => {
                const allTags = await findTagByGameId(game.id);
                return {
                    gameId: game.id,
                    title: game.title,
                    thumbnailUrl: await getPresignedUrl(game.thumbnailUrl),
                    itemId: game.itemId,
                    price: game.price,
                    description: game.description,
                    tags: allTags,
                };
            })
        );
        return games;
    } catch(err){
        throw err;
    }
};

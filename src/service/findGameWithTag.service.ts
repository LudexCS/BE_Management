import { findGameWithTag } from '../repository/game.repository'
import {getPresignedUrl} from "./s3.service";

export const findGameWithTagService = async (
    tags: string[]
): Promise<{ gameId: number, title: string; thumbnail_url: string }[]> => {
    try {
        const taggedGameRows = await findGameWithTag(tags);

        return await Promise.all(
            taggedGameRows.map(async (game) => ({
                gameId: game.id,
                title: game.title,
                thumbnail_url: await getPresignedUrl(game.thumbnailUrl),
                itemId: game.itemId
            }))
        );
    } catch(err){
        throw err;
    }
};

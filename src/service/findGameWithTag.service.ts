import { findGameWithTag } from '../repository/game.repository'
import {getPresignedUrl} from "./s3.service";

export const findGameWithTagService = async (
    tags: string[]
): Promise<{ gameId: number, title: string; thumbnail_url: string }[]> => {
    try {
        const taggedGameRows = await findGameWithTag(tags);

        return await Promise.all(
            taggedGameRows.map(async (game) => ({
                ...game,
                thumbnail_url: await getPresignedUrl(game.thumbnailUrl)
            }))
        );
    } catch(err){
        throw err;
    }
};

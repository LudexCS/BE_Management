import { findGameWithTag } from '../repository/game.repository'
import {getPresignedUrl} from "./s3.service";

export const findGameWithTagService = async (
    tags: string[]
): Promise<{ title: string; thumnail_url: string }[]> => {
    try {
        const taggedGameRows = await findGameWithTag(tags);

        return await Promise.all(
            taggedGameRows.map(async (game) => ({
                ...game,
                thumnail_url: await getPresignedUrl(game.thumnailUrl)
            }))
        );
    } catch(err){
        throw err;
    }
};

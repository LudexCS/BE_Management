import { findGameWithTag } from '../repository/game.repository'

export const findGameWithTagService = async (
    tags: string[]
): Promise<{ title: string; thumnail_url: string }[]> => {
    try {
        return await findGameWithTag(tags);
    } catch(err){
        throw err;
    }
};

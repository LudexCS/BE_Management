import {findGameWithTagService} from '../service/findGameWithTag.service'

export const getGameByTagControl = async (tags: string[]) => {
    return await findGameWithTagService(tags);
};

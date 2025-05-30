import {findGameWithTagService} from '../service/findGameWithTag.service'

export const getGameByTagControl = async (tags: string[], isAdmin: boolean) => {
    return await findGameWithTagService(tags, isAdmin);
};

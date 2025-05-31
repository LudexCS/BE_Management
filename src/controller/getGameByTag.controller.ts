import {adminFindGameWithTagService, findGameWithTagService} from '../service/findGameWithTag.service'

export const getGameByTagControl = async (tags: string[]) => {
    return await findGameWithTagService(tags);
};

export const adminGetGameByTagControl = async (tags: string[]) => {
    return await adminFindGameWithTagService(tags);
};
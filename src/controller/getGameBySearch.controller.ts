import {searchGameService} from "../service/searchGameList.service";

export const searchGameController = async (keyword: string) => {
    return await searchGameService(keyword);
};
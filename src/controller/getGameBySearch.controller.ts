import {searchGameService} from "../service/searchGameList.service";

export const searchGameController = async (keyword: string) => {
    try {
        return await searchGameService(keyword);
    } catch (error) {
        throw error;
    }
};
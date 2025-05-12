import {searchGameService} from "../service/searchGameList.service";

export const searchGameController = async (keyword: string, limit: number) => {
    try {
        return await searchGameService(keyword, limit);
    } catch (error) {
        throw error;
    }
};
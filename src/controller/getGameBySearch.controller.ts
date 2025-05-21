import {searchGameByChoseongService, searchGameService} from "../service/searchGameList.service";
import {canBeChoseong} from "es-hangul";

export const searchGameControl = async (keyword: string) => {
    if (!keyword?.trim()) {
        throw new Error("Keyword must be provided");
    }
    if (canBeChoseong(keyword[0])) {
        return await searchGameByChoseongService(keyword);
    }
    else {
        return await searchGameService(keyword);
    }
};
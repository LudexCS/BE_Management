import {
    searchGameByChoseongService,
    searchGameByEmbeddingSimilarityService,
    searchGameByKeywordLikeService
} from "../service/searchGameList.service";
import {canBeChoseong} from "es-hangul";
import {GamesListDto} from "../dto/gamesList.dto";

export const searchGameControl = async (keyword: string) => {
    if (!keyword?.trim()) {
        throw new Error("Keyword must be provided");
    }
    if (canBeChoseong(keyword[0])) {
        return await searchGameByChoseongService(keyword);
    }
    else {
        const byKeyword = await searchGameByKeywordLikeService(keyword);
        const byEmbedding = await searchGameByEmbeddingSimilarityService(keyword);

        // 두 배열을 합치고
        const combined = [...byKeyword, ...byEmbedding];

        // gameId 기준 중복 제거
        const uniqueGamesMap = new Map<number, GamesListDto>();
        for (const game of combined) {
            uniqueGamesMap.set(game.gameId, game);
        }

        const uniqueGames = Array.from(uniqueGamesMap.values());
        return uniqueGames;
    }
};
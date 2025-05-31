import {GamesListDto} from "../dto/gamesList.dto";
import {
    adminFindGamesByIds, adminSearchGameByChoseong, adminSearchGameByKeyword,
    findGamesByIds,
    searchGameByChoseong,
    searchGameByKeyword
} from "../repository/game.repository";
import {findTagByGameId} from "../repository/gameTag.repository";
import {createEmbeddingVector} from "./openAI.service";
import {searchSimilarGames} from "./qdrant.service";

//region UserSearch
export const searchGameByChoseongService = async (keyword: string): Promise<GamesListDto[]> => {
    // 게임 titleChoseong + 태그 nameChoseong 결과를 return. - 일치하는 것만 가져옴.
    const searchedGameRows = await searchGameByChoseong(keyword);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };
        })
    );

    return games;
};

export const searchGameByKeywordLikeService = async ( keyword: string): Promise<GamesListDto[]> => {
    // 게임 title + 게임 titleKo + 게임 description + 태그 name + 태그 nameKo 결과를 append해 return. - Like 연산.
    // 최종적으로 중복을 제거하고 리턴.
    const searchedGameRows = await searchGameByKeyword(keyword);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };
        })
    );
    return games;
};

export const searchGameByEmbeddingSimilarityService = async ( keyword: string): Promise<GamesListDto[]> => {
    // 게임 embedding vector와 코사인 유사도를 측정해 threshold를 넘는 게임만 append.
    const queryEmbedding = await createEmbeddingVector(keyword);
    const searchedGameIds = await searchSimilarGames(queryEmbedding);

    const searchedGameRows = await findGamesByIds(searchedGameIds);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };
        })
    );

    console.log("Embedding Similarity Result: " + JSON.stringify(games));

    return games;
};
//endregion

//region AdminSearch/
export const AdminSearchGameByChoseongService = async (keyword: string): Promise<GamesListDto[]> => {
    // 게임 titleChoseong + 태그 nameChoseong 결과를 return. - 일치하는 것만 가져옴.
    const searchedGameRows = await adminSearchGameByChoseong(keyword);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };
        })
    );

    return games;
};

export const AdminSearchGameByKeywordLikeService = async ( keyword: string): Promise<GamesListDto[]> => {
    // 게임 title + 게임 titleKo + 게임 description + 태그 name + 태그 nameKo 결과를 append해 return. - Like 연산.
    // 최종적으로 중복을 제거하고 리턴.
    const searchedGameRows = await adminSearchGameByKeyword(keyword);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };
        })
    );
    return games;
};

export const AdminSearchGameByEmbeddingSimilarityService = async ( keyword: string): Promise<GamesListDto[]> => {
    // 게임 embedding vector와 코사인 유사도를 측정해 threshold를 넘는 게임만 append.
    const queryEmbedding = await createEmbeddingVector(keyword);
    const searchedGameIds = await searchSimilarGames(queryEmbedding);

    const searchedGameRows = await adminFindGamesByIds(searchedGameIds);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                titleKo: game.titleKo,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                downloadTimes: game.downloadTimes,
                tags: allTags,
            };
        })
    );

    console.log("Embedding Similarity Result: " + JSON.stringify(games));

    return games;
};
//endregion
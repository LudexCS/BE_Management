import {GamesListDto} from "../dto/gamesListDto";
import {searchGameByKeyword} from "../repository/game.repository";
import {findTagByGameId} from "../repository/gameTag.repository";

export const searchGameByChoseongService = async (keyword: string): Promise<GamesListDto[]> => {
    // 게임 titleChoseong + 태그 nameChoseong 결과를 append해 return. - 일치하는 것만 가져옴.
}

export const searchGameService = async ( keyword: string ): Promise<GamesListDto[]> => {
    // 게임 title + 게임 titleKo + 게임 description + 태그 name + 태그 nameKo 결과를 append해 return. - Like 연산.
    // 게임 embedding vector와 코사인 유사도를 측정해 threshold를 넘는 게임만 append.
    // 최종적으로 중복을 제거하고 리턴.
    const searchedGameRows = await searchGameByKeyword(keyword);

    const games: GamesListDto[] = await Promise.all(
        searchedGameRows.map(async (game) => {
            const allTags = await findTagByGameId(game.id);
            return {
                gameId: game.id,
                title: game.title,
                thumbnailUrl: game.thumbnailUrl,
                itemId: game.itemId,
                price: game.price,
                description: game.description,
                tags: allTags
            };
        })
    );
    return games;
};
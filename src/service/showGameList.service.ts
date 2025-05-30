import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { findGameList, findOriginGameList, findVarientGameList } from '../repository/game.repository'


export const getGameList = async(gameListRequestDto: GameListRequestDto, isAdmin: boolean) => {
    const gameListRows =  await findGameList(gameListRequestDto, isAdmin);

    return gameListRows.map((game) => {
        const base = {
            gameId: game.id,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            itemId: game.itemId,
            isBlocked: game.isBlocked
        };
        return base;
    });
}

export const getOriginGameInfo = async(gameId: number, isAdmin: boolean) => {
    const originGameListRows = await findOriginGameList(gameId, isAdmin);
    return originGameListRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
        };

        if (isAdmin) {
            return { ...base, isBlocked: game.isBlocked };
        }

        return base;
    });
};

export const getVariantGameInfo = async(gameId: number, isAdmin: boolean) => {
    const varientGameRows = await findVarientGameList(gameId, isAdmin);

    return varientGameRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl
        };

        if (isAdmin) {
            return {...base, isBlocked: game.isBlocked};
        }

        return base;
    });
};
import { GameListRequestDto} from "../dto/gameListRequest.dto";
import {
    adminFindGameList,
    adminFindOriginGameList, adminFindVarientGameList,
    findGameList,
    findOriginGameList,
    findVarientGameList
} from '../repository/game.repository'


export const getGameList = async(gameListRequestDto: GameListRequestDto) => {
    const gameListRows =  await findGameList(gameListRequestDto);

    return gameListRows.map((game) => {
        const base = {
            gameId: game.id,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            itemId: game.itemId,
        };
        return base;
    });
}

export const getOriginGameInfo = async(gameId: number) => {
    const originGameListRows = await findOriginGameList(gameId);
    return originGameListRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl
        };
        return base;
    });
};

export const getVariantGameInfo = async(gameId: number) => {
    const varientGameRows = await findVarientGameList(gameId);

    return varientGameRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl
        };
        return base;
    });
};

export const adminGetGameList = async(gameListRequestDto: GameListRequestDto) => {
    const gameListRows =  await adminFindGameList(gameListRequestDto);

    return gameListRows.map((game) => {
        const base = {
            gameId: game.id,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            itemId: game.itemId,
            isBlocked: game.isBlocked,
        };
        return base;
    });
}

export const adminGetOriginGameInfo = async(gameId: number) => {
    const originGameListRows = await adminFindOriginGameList(gameId);
    return originGameListRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            isBlocked: game.isBlocked,
        };
        return base;
    });
};

export const adminGetVariantGameInfo = async(gameId: number) => {
    const varientGameRows = await adminFindVarientGameList(gameId);

    return varientGameRows.map((game) => {
        const base = {
            gameId: game.gameId,
            title: game.title,
            titleKo: game.titleKo,
            thumbnailUrl: game.thumbnailUrl,
            isBlocked: game.isBlocked,
        };
        return base;
    });
};
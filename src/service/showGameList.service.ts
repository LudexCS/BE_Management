import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { findGameList, findOriginGameList, findVarientGameList } from '../repository/game.repository'


export const getGameList = async(gameListRequestDto: GameListRequestDto) => {
    const { page, limit } = gameListRequestDto;
    const offset = (page - 1) * limit;
    const gameListRows =  await findGameList(gameListRequestDto);

    return await Promise.all(
        gameListRows.map(async (game) => ({
            gameId: game.id,
            title: game.title,
            thumbnailUrl: game.thumbnailUrl,
            itemId: game.itemId

    }))
    );
}

export const getOriginGameInfo = async(gameId: number) => {
    const originGameListRows = await findOriginGameList(gameId);
    return await Promise.all(
        originGameListRows.map(async (game) => ({
            gameId: game.gameId,
            title: game.title,
            thumbnailUrl: game.thumbnailUrl
        }))
    )
}

export const getVariantGameInfo = async(gameId: number) => {
    const varientGameRows = await findVarientGameList(gameId);

    return await Promise.all(
        varientGameRows.map(async (game) => ({
            gameId: game.gameId,
            title: game.title,
            thumbnailUrl: game.thumbnailUrl
        }))
    );
}
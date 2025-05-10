import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { findGameList, findOriginGameList, findVarientGameList } from '../repository/game.repository'
import { getPresignedUrl } from "../service/s3.service";


export const getGameList = async(gameListRequestDto: GameListRequestDto) => {
    const { page, limit } = gameListRequestDto;
    const offset = (page - 1) * limit;
    try{
        const gameListRows =  await findGameList(gameListRequestDto);
        console.log("thumbnailUrl:", gameListRows[0].thumbnailUrl);
        return await Promise.all(
            gameListRows.map(async (game) => ({
                game_id: game.id,
                title: game.title,
                thumbnail_url: await getPresignedUrl(game.thumbnailUrl),
                item_id: game.itemId

        }))
        );
    } catch(err){
        throw err;
    }
}

export const getOriginGameInfo = async(gameId: number) => {
    try{
        const originGameListRows = await findOriginGameList(gameId);
        return await Promise.all(
            originGameListRows.map(async (game) => ({
                gameId: game.gameId,
                title: game.title,
                thumbnail_url: await getPresignedUrl(game.thumbnailUrl)
            }))
        )
    } catch(err){
        throw err;
    }
}

export const getVariantGameInfo = async(gameId: number) => {
    try{
        const varientGameRows = await findVarientGameList(gameId);

        return await Promise.all(
            varientGameRows.map(async (game) => ({
                gameId: game.gameId,
                title: game.title,
                thumbnail_url: await getPresignedUrl(game.thumbnailUrl)
            }))
        );
    } catch(err){
        throw err;
    }
}
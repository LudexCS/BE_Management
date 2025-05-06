import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { findGameList, findOriginGameList, findVarientGameList } from '../repository/game.repository'
import { getPresignedUrl } from "../service/s3.service";


export const getGameList = async(gameListRequestDto: GameListRequestDto) => {
    const { page, limit, sort} = gameListRequestDto;
    const offset = (page - 1) * limit;
    try{
        const gameListRows =  await findGameList(gameListRequestDto);
        return await Promise.all(
            gameListRows.map(async (game) => ({
            ...game,
            thumnail_url: await getPresignedUrl(game.thumnailUrl)
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
                ...game,
                thumnail_url: await getPresignedUrl(game.thumnailUrl)
            }))
        )
    } catch(err){
        throw err;
    }
}

export const getVarientGameInfo = async(gameId: number) => {
    try{
        const varientGameRows = await findVarientGameList(gameId);

        return await Promise.all(
            varientGameRows.map(async (game) => ({
                ...game,
                thumnail_url: await getPresignedUrl(game.thumnailUrl)
            }))
        );
    } catch(err){
        throw err;
    }
}
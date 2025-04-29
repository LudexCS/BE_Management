import { GameListRequestDto} from "../dto/gameListRequest.dto";
import { findGameList, findOriginGameList, findVarientGameList } from '../repository/game.repository'

export const getGameList = async(gameListRequestDto: GameListRequestDto) => {
    const { page, limit, sort} = gameListRequestDto;
    const offset = (page - 1) * limit;
    try{
        return await findGameList(gameListRequestDto);
    } catch(err){
        throw err;
    }
}

export const getOriginGameInfo = async(gameId: number) => {
    try{
        return await findOriginGameList(gameId);
    } catch(err){
        throw err;
    }
}

export const getVarientGameInfo = async(gameId: number) => {
    try{
        return await findVarientGameList(gameId);
    } catch(err){
        throw err;
    }
}
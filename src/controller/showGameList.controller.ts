import { Request } from 'express';
import { getGameList, getOriginGameInfo, getVariantGameInfo } from '../service/showGameList.service'
import { GameListRequestDto} from "../dto/gameListRequest.dto";

export const loadGameListControl = async (gameListRequestDto: GameListRequestDto) =>{
    try{
        return await getGameList(gameListRequestDto);
    } catch(err){
        throw err;
    }
}

export const showOriginGameHierarchyControl = async (gameId: number) =>{
    try{
        return await getOriginGameInfo(gameId);
    } catch(err){
        throw err;
    }
}

export const showVarientGameHierarchyControl = async (gameId: number) =>{
    try{
        return await getVariantGameInfo(gameId);
    } catch(err){
        throw err;
    }
}
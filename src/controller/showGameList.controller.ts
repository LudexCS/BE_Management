import { Request } from 'express';
import { getGameList, getOriginGameIdThumnail, getVarientGameIdThumnail } from '../serviece/showGameList.service'

export const loadGameListControl = async (req: Request) =>{
    const gameListRequestDto = req.body as GameListRequestDto;
    try{
        return await getGameList(gameListRequestDto);
    } catch(err){
        throw err;
    }
}

export const showOriginGameHierarchyControl = async (req: Request) =>{
    const gameId = req.body;
    try{
        return await getOriginGameInfo(gameId);
    } catch(err){
        throw err;
    }
}

export const showVarientGameHierarchyControl = async (req: Request) =>{
    const gameId = req.body;
    try{
        return await getVarientGameInfo(gameId);
    } catch(err){
        throw err;
    }
}
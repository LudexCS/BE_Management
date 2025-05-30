import { getGameList, getOriginGameInfo, getVariantGameInfo } from '../service/showGameList.service'
import { GameListRequestDto} from "../dto/gameListRequest.dto";

export const loadGameListControl = async (gameListRequestDto: GameListRequestDto, isAdmin: boolean) =>{
    return await getGameList(gameListRequestDto, isAdmin);
}

export const showOriginGameHierarchyControl = async (gameId: number, isAdmin: boolean) =>{
    return await getOriginGameInfo(gameId, isAdmin);
}

export const showVarientGameHierarchyControl = async (gameId: number, isAdmin: boolean) =>{
    return await getVariantGameInfo(gameId, isAdmin);
}
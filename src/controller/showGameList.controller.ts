import { getGameList, getOriginGameInfo, getVariantGameInfo } from '../service/showGameList.service'
import { GameListRequestDto} from "../dto/gameListRequest.dto";

export const loadGameListControl = async (gameListRequestDto: GameListRequestDto) =>{
    return await getGameList(gameListRequestDto);
}

export const showOriginGameHierarchyControl = async (gameId: number) =>{
    return await getOriginGameInfo(gameId);
}

export const showVarientGameHierarchyControl = async (gameId: number) =>{
    return await getVariantGameInfo(gameId);
}
import {
    getPurchasedGamesInfo,
    getSoldGamesInfo,
    getPurchasedResourcesInfo,
    getSoldResourcesInfo
} from '../repository/tradeInfo.repository'
import { TradeHistoryDto, GameTradeDto, ResourceTradeDto } from '../dto/tradeInfoRaw.dto';
import {getUserIdByEmail} from "../grpc/auth.client";

export const getUserTradeHistory = async (email: string): Promise<TradeHistoryDto> => {
    try {
        const userId = await getUserIdByEmail(email);
        const purchasedGames: GameTradeDto[] = await getPurchasedGamesInfo(userId);
        const purchasedResources: ResourceTradeDto[] = await getPurchasedResourcesInfo(userId);
        const soldGames: GameTradeDto[] = await getSoldGamesInfo(userId);
        const soldResources: ResourceTradeDto[] = await getSoldResourcesInfo(userId);

        return {
            purchased: {
                games: purchasedGames,
                resources: purchasedResources,
            },
            sold: {
                games: soldGames,
                resources: soldResources
            },
        };
    }catch(err){
        throw err;
    }
};
import { getPurchasedGamesInfo, getSoldGamesInfo, getPurchasedResourcesInfo } from '../repository/tradeInfo.repository'
import { TradeHistoryDto, GameTradeDto, ResourceTradeDto } from '../dto/tradeInfoRawDto';
import {getUserIdByEmail} from "../grpc/auth.client";

export const getUserTradeHistory = async (email: string): Promise<TradeHistoryDto> => {
    try {
        const userId = await getUserIdByEmail(email);
        const purchasedGames: GameTradeDto[] = await getPurchasedGamesInfo(userId);
        const purchasedResources: ResourceTradeDto[] = await getPurchasedResourcesInfo(userId);
        const soldGames: GameTradeDto[] = await getSoldGamesInfo(userId);

        return {
            purchased: {
                games: purchasedGames,
                resources: purchasedResources,
            },
            sold: {
                games: soldGames,
            },
        };
    }catch(err){
        throw err;
    }
};
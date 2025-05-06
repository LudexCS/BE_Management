import { getPurchasedGamesInfo, getSoldGamesInfo, getPurchasedResourcesInfo } from '../repository/tradeInfo.repository'
import { TradeHistoryDto } from '../dto/tradeInfoRawDto';

export const getUserTradeHistory = async (userId: number): Promise<TradeHistoryDto> => {
    const purchasedGames = await getPurchasedGamesInfo(userId);
    const purchasedResources = await getPurchasedResourcesInfo(userId);
    const soldGames = await getSoldGamesInfo(userId);

    return {
        purchased: {
            games: purchasedGames,
            resources: purchasedResources,
        },
        sold: {
            games: soldGames,
        },
    };
};
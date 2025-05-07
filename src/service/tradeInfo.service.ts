import { getPurchasedGamesInfo, getSoldGamesInfo, getPurchasedResourcesInfo } from '../repository/tradeInfo.repository'
import { findUserIdByEmail } from "../repository/account.repository";
import { TradeHistoryDto, GameTradeDto, ResourceTradeDto } from '../dto/tradeInfoRawDto';

export const getUserTradeHistory = async (email: string): Promise<TradeHistoryDto> => {
    try {
        const account = await findUserIdByEmail(email);
        const purchasedGames: GameTradeDto[] = await getPurchasedGamesInfo(account.id);
        const purchasedResources: ResourceTradeDto[] = await getPurchasedResourcesInfo(account.id);
        const soldGames: GameTradeDto[] = await getSoldGamesInfo(account.id);

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
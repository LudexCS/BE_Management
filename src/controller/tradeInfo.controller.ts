import { getPurchasedGameList } from '../service/tradeInfo.service';
import {TradeHistoryDto} from "../dto/tradeInfoRawDto";

export const getTradeHistoryControl = async (userId: number): Promise<TradeHistoryDto> => {
    try {
        return await getTradeHistory(userId);
    } catch (err) {
        throw err;
    }
};
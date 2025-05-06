import { getUserTradeHistory } from '../service/tradeInfo.service';
import {TradeHistoryDto} from "../dto/tradeInfoRawDto";

export const getTradeHistoryControl = async (userId: number): Promise<TradeHistoryDto> => {
    try {
        return await getUserTradeHistory(userId);
    } catch (err) {
        throw err;
    }
};
import { getUserTradeHistory } from '../service/tradeInfo.service';
import {TradeHistoryDto} from "../dto/tradeInfoRawDto";

export const getTradeHistoryControl = async (email: string): Promise<TradeHistoryDto> => {
    return await getUserTradeHistory(email);
};
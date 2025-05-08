import { getUserTradeHistory } from '../service/tradeInfo.service';
import {TradeHistoryDto} from "../dto/tradeInfoRawDto";
import { Request} from 'express'

export const getTradeHistoryControl = async (email: string): Promise<TradeHistoryDto> => {
    try {
        return await getUserTradeHistory(email);
    } catch (err) {
        throw err;
    }
};
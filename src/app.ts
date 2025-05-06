import express, { Express } from 'express';
import cors from 'cors';
import GameDataRoute from "./route/gameData.route";
import TradeInfoRoute from "./route/tradeInfo.route";

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use('get', GameDataRoute);
app.use('get', TradeInfoRoute)
export default app;
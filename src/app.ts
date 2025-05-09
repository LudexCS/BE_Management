import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger.config';
import getGameRoute from './route/showGameList.route';
import gameRoute from './route/game.route';
import resourceRoute from './route/resource.route';
import jwtGuard from './middleware/jwt.guard';
import gameDataRoute from "./route/gameData.route";
import tradeInfoRoute from "./route/tradeInfo.route";

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}))

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// jwt middleware
app.use('/api/protected', jwtGuard);
app.use('/api/protected/game', gameRoute);
app.use('/api/protected/resource', resourceRoute);
app.use('/api/get', getGameRoute);


app.use('/games', gameDataRoute);
app.use('/protected/get/tradeInfo', tradeInfoRoute)
export default app;
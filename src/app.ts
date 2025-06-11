import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger.config';
import getGameRoute from './route/gameData.route';
import gameRoute from './route/game.route';
import resourceRoute from './route/resource.route';
import jwtGuard from './middleware/jwt.guard';
import tradeInfoRoute from "./route/tradeInfo.route";
import updateData from './route/gameEdit.route'
import adminGetGameRoute from "./route/adminGameData.route";
import adminGuard from './middleware/admin.guard'
import discountRoute from "./route/discount.route";

const app : Express = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://uosludex.com', 'https://uosludex.com'],
    credentials: true
}))

// Swagger UI 설정
app.use('/management/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// jwt middleware
app.use('/management/api/protected', jwtGuard);
app.use('/management/api/admin', adminGuard);
app.use('/management/api/protected/game', gameRoute);
app.use('/management/api/protected/resource', resourceRoute);
app.use('/management/api/get', getGameRoute);
app.use('/management/api/protected/get/', tradeInfoRoute)
app.use('/management/api/protected/patch', updateData)
app.use('/management/api/admin/get', adminGetGameRoute);
app.use('/management/api/protected/discount', discountRoute);
export default app;
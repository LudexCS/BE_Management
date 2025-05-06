import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs, swaggerUiOptions } from './config/swagger.config';
import getGameRoute from './route/showGameList.route';
import gameRoute from './route/game.route';
import resourceRoute from './route/resource.route';
import jwtGuard from './middleware/jwt.guard';

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


export default app;
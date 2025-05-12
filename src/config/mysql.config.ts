import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Game } from '../entity/game.entity';
import { GameTag } from "../entity/gameTag.entity";
import {GameImageUrl} from "../entity/gameImageUrl.entity";
import {GameRequirement} from "../entity/gameRequirement.entity";
import {OriginGame} from "../entity/originGame.entity";
import {Resource} from "../entity/resource.entity";
import {ResourceImageUrl} from "../entity/resourceImageUrl.entity";
import { Account } from "../entity/account.entity";

const HOST = process.env.DB_HOST || 'localhost';
const PORT = Number(process.env.DB_PORT) || 3306;
const USER_NAME = process.env.DB_USER_NAME || 'username';
const PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME;

const AppDataSource = new DataSource({
    type: 'mysql',
    host: HOST,
    port: PORT,
    username: USER_NAME,
    password: PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    entities: [ Game, GameTag, GameImageUrl, GameRequirement, OriginGame, Resource, ResourceImageUrl, Account ],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;

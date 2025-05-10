import AppDataSource from "../config/mysql.config";
import {GameTradeDto, RequirementDto, TradeInfoRawDto, ResourceTradeDto} from "../dto/tradeInfoRawDto";
import {getPresignedUrl} from "../service/s3.service";


export const groupGameRowsWithRequirements = async (rows: TradeInfoRawDto[]) => {
    const gameMap = new Map<number, GameTradeDto>();

    for (const row of rows) {
        const existing = gameMap.get(row.id);

        const requirement: RequirementDto | null = row.is_minimum !== null
            ? {
                is_minimum: !!row.is_minimum,
                os: row.os ?? undefined,
                cpu: row.cpu ?? undefined,
                gpu: row.gpu ?? undefined,
                ram: row.ram ?? undefined,
                storage: row.storage ?? undefined
            }
            : null;

        if (existing) {
            if (requirement) existing.requirement.push(requirement);
        } else {
            const presignedUrl = await getPresignedUrl(row.thumbnail_url);

            gameMap.set(row.id, {
                game_id: row.id,
                user_id: row.user_id,
                title: row.title,
                price: row.price,
                description: row.description,
                item_id: row.item_id,
                thumbnail_url: presignedUrl,
                requirement: requirement ? [requirement] : []
            });
        }
    }

    return Array.from(gameMap.values());
};

export const getPurchasedGameRowsWithRequirements = async (userId: number): Promise<TradeInfoRawDto[]> => {
    return await AppDataSource.query(`
    SELECT g.id, g.user_id, g.title, g.price, g.description, g.thumbnail_url, g.item_id,
           gr.is_minimum, gr.os, gr.cpu, gr.gpu, gr.ram, gr.storage
    FROM purchased_game pg
    JOIN game g ON pg.game_id = g.id
    LEFT JOIN game_requirement gr ON gr.game_id = g.id
    WHERE pg.user_id = ?
  `, [userId]);
};

export const getPurchasedGamesInfo = async (userId: number): Promise<GameTradeDto[]> => {
    const rows = await getPurchasedGameRowsWithRequirements(userId);
    return await groupGameRowsWithRequirements(rows);
};

export const getSoldGameRowsWithRequirements = async (userId: number): Promise<TradeInfoRawDto[]> => {
    return await AppDataSource.query(`
    SELECT g.id, g.user_id, g.title, g.price, g.description, g.thumbnail_url, g.item_id,
           gr.is_minimum, gr.os, gr.cpu, gr.gpu, gr.ram, gr.storage
    FROM game g
    LEFT JOIN game_requirement gr ON gr.game_id = g.id
    WHERE g.user_id = ?
  `, [userId]);
};

export const getSoldGamesInfo = async (userId: number): Promise<GameTradeDto[]> => {
    const rows = await getSoldGameRowsWithRequirements(userId);
    return await groupGameRowsWithRequirements(rows);
};


export const getPurchasedResourcesInfo = async (userId: number) : Promise<ResourceTradeDto[]> => {
    const rows =  await AppDataSource.query(`
    SELECT r.id AS resource_id, r.user_id, r.description, r.sharer_id, r.seller_ratio, r.creator_ratio, ru.url, g.id
    FROM resource r
    JOIN resource_transaction rt ON rt.resource_id = r.id
    LEFT JOIN game g ON r.game_id = g.id
    LEFT JOIN resource_image_url ru ON r.id = ru.resource_id 
    WHERE rt.buyer_id = ?
  `, [userId]);

    return await Promise.all((rows as ResourceTradeDto[]).map(async (row) => ({
        resource_id: row.resource_id,
        user_id: row.user_id,
        description: row.description,
        sharer_id: row.sharer_id,
        seller_ratio: row.seller_ratio,
        creater_ratio: row.creater_ratio,
        image_url: await getPresignedUrl(row.image_url),
        game_id: row.game_id,
    })));
};
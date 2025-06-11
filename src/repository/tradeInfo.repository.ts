import AppDataSource from "../config/mysql.config";
import {GameTradeDto, RequirementDto, TradeInfoRawDto, ResourceTradeDto} from "../dto/tradeInfoRaw.dto";


export const groupGameRowsWithRequirements = async (rows: TradeInfoRawDto[]) => {
    const gameMap = new Map<number, GameTradeDto>();

    for (const row of rows) {
        if(!row) continue;

        const existing = gameMap.get(row.id);
        const requirement: RequirementDto | null = row.isMinimum !== null
            ? {
                isMinimum: !!row.isMinimum,
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
            gameMap.set(row.id, {
                gameId: row.id,
                userId: row.userId,
                title: row.title,
                price: row.price,
                description: row.description,
                itemId: row.itemId,
                thumbnailUrl: row.thumbnailUrl ? row.thumbnailUrl : "",
                purchaseId: row.purchaseId,
                requirement: requirement ? [requirement] : [],
                downloadTimes: row.downloadTimes
            });
        }
    }

    return Array.from(gameMap.values());
};

export const getPurchasedGameRowsWithRequirements = async (userId: number): Promise<TradeInfoRawDto[]> => {
    return await AppDataSource.query(`
        SELECT
            g.id AS id,
            g.user_id AS userId,
            g.title AS title,
            g.price AS price,
            g.description AS description,
            g.thumbnail_url AS thumbnailUrl,
            g.item_id AS itemId,
            gr.is_minimum AS isMinimum,
            gr.os AS os,
            gr.cpu AS cpu,
            gr.gpu AS gpu,
            gr.ram AS ram,
            gr.storage AS storage,
            pg.purchase_id AS purchaseId,
        FROM purchased_game pg
                 JOIN game g ON pg.game_id = g.id
                 LEFT JOIN game_requirement gr ON gr.game_id = g.id
        WHERE pg.user_id = ?
    `, [userId]);
};

export const getPurchasedGamesInfo = async (userId: number): Promise<GameTradeDto[]> => {
    const rows = await getPurchasedGameRowsWithRequirements(userId);
    if(rows.length == 0) return [];

    return await groupGameRowsWithRequirements(rows);
};

export const getSoldGameRowsWithRequirements = async (userId: number): Promise<TradeInfoRawDto[]> => {
    return await AppDataSource.query(`
        SELECT
            g.id AS id,
            g.user_id AS userId,
            g.title AS title,
            g.price AS price,
            g.description AS description,
            g.thumbnail_url AS thumbnailUrl,
            g.item_id AS itemId,
            gr.is_minimum AS isMinimum,
            gr.os AS os,
            gr.cpu AS cpu,
            gr.gpu AS gpu,
            gr.ram AS ram,
            gr.storage AS storage,
            g.download_times AS downloadTimes,
        FROM game g
                 LEFT JOIN game_requirement gr ON gr.game_id = g.id
        WHERE g.user_id = ?
    `, [userId]);
};

export const getSoldGamesInfo = async (userId: number): Promise<GameTradeDto[]> => {
    const rows = await getSoldGameRowsWithRequirements(userId);
    if(rows.length == 0) return [];
    return await groupGameRowsWithRequirements(rows);
};


export const getPurchasedResourcesInfo = async (userId: number): Promise<ResourceTradeDto[]> => {
    const rows = await AppDataSource.query(`
        SELECT
            r.id AS resourceId,
            r.user_id AS userId,
            r.description,
            r.sharer_id AS sharerId,
            r.seller_ratio AS sellerRatio,
            r.creator_ratio AS createrRatio,
            r.allow_derivation AS allowDerivation,
            r.download_times AS downloadTimes,
            ru.url AS imageUrl,
            g.id AS gameId,
            g.title AS title
        FROM resource r
                 JOIN resource_transaction rt ON rt.resource_id = r.id
                 LEFT JOIN game g ON r.game_id = g.id
                 LEFT JOIN resource_image_url ru ON r.id = ru.resource_id
        WHERE rt.buyer_id = ?
    `, [userId]);

    if(rows.length == 0) return [];

    return await Promise.all((rows as ResourceTradeDto[]).map(async (row) => ({
        resourceId: row.resourceId,
        userId: row.userId,
        description: row.description,
        sharerId: row.sharerId,
        sellerRatio: row.sellerRatio,
        createrRatio: row.createrRatio,
        allowDerivation: row.allowDerivation,
        downloadTimes: row.downloadTimes,
        imageUrl: row.imageUrl ? row.imageUrl : "",
        gameId: row.gameId,
        title: row.title,
    })));
};

export const getSoldResourcesInfo = async (userId: number): Promise<ResourceTradeDto[]> => {
    const rows = await AppDataSource.query(`
        SELECT
            r.id AS resourceId,
            r.user_id AS userId,
            r.description,
            r.sharer_id AS sharerId,
            r.seller_ratio AS sellerRatio,
            r.creator_ratio AS createrRatio,
            r.allow_derivation AS allowDerivation,
            r.download_times AS downloadTimes,
            ru.url AS imageUrl,
            g.id AS gameId,
            g.title AS title
        FROM game g
                 LEFT JOIN resource r ON r.game_id = g.id
                 LEFT JOIN resource_image_url ru ON r.id = ru.resource_id
        WHERE g.user_id = ?
    `, [userId]);

    if(rows.length == 0) return [];

    return await Promise.all((rows as ResourceTradeDto[]).map(async (row) => ({
        resourceId: row.resourceId,
        userId: row.userId,
        description: row.description,
        sharerId: row.sharerId,
        sellerRatio: row.sellerRatio,
        createrRatio: row.createrRatio,
        allowDerivation: row.allowDerivation,
        downloadTimes: row.downloadTimes,
        imageUrl: row.imageUrl ? row.imageUrl : "",
        gameId: row.gameId,
        title: row.title,
    })));
};
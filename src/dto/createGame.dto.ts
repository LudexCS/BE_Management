import {Game} from "../entity/game.entity";
import {GameImageUrl} from "../entity/gameImageUrl.entity";
import {GameTag} from "../entity/gameTag.entity";
import {GameRequirement} from "../entity/gameRequirement.entity";
import {OriginGame} from "../entity/originGame.entity";

interface BaseGameDto {
    title: string;
    userId?: number;
    price: number;
    thumbnailUrl: {
        path: string;
        mimetype: string;
    };
    description?: string;
    imageUrls?: {
        path: string;
        mimetype: string;
    }[];

    requirements: {
        isMinimum: boolean;
        os?: string;
        cpu?: string;
        gpu?: string;
        ram?: string;
        storage?: string;
        network?: string;
    }[];

    tags: {
        tagId: number;
        priority: number;
    }[];

    isOrigin: boolean;
}

export type CreateGameDto =
    | (BaseGameDto & { isOrigin: true; originGameIds?: undefined })
    | (BaseGameDto & { isOrigin: false; originGameIds: number[] });

export function toGameEntity(createGameDto: CreateGameDto): Game {
    const game = new Game();
    game.title = createGameDto.title;
    game.userId = createGameDto.userId as number;
    game.price = createGameDto.price;
    game.thumbnailUrl = createGameDto.thumbnailUrl.path;
    game.description = createGameDto.description as string;
    game.downloadTimes = 0;
    game.registeredAt = new Date();
    game.updatedAt = new Date();
    return game;
}

export function toGameImageUrlEntities(imageUrls: string[], gameId: number): GameImageUrl[] {
    if(!imageUrls || imageUrls.length === 0) {
        return [];
    }

    return imageUrls.map(url => {
        const gameImageUrl = new GameImageUrl();
        gameImageUrl.gameId = gameId;
        gameImageUrl.url = url;
        return gameImageUrl;
    });
}

export function toGameTagEntities(createGameDto: CreateGameDto, gameId: number): GameTag[] {
    if(!createGameDto.tags || createGameDto.tags.length === 0) {
        return [];
    }
    return createGameDto.tags.map(tag => {
        const gameTag = new GameTag();
        gameTag.gameId = gameId;
        gameTag.tagId = tag.tagId;
        gameTag.priority = tag.priority;
        return gameTag;
    });
}

export function toGameRequirementEntities(createGameDto: CreateGameDto, gameId: number): GameRequirement[] {
    if (!createGameDto.requirements || createGameDto.requirements.length === 0) {
        return [];
    }
    return createGameDto.requirements.map(requirement => {
        const gameRequirement = new GameRequirement();
        gameRequirement.gameId = gameId;
        gameRequirement.isMinimum = requirement.isMinimum;
        if (requirement.os) gameRequirement.os = requirement.os;
        if (requirement.cpu) gameRequirement.cpu = requirement.cpu;
        if (requirement.gpu) gameRequirement.gpu = requirement.gpu;
        if (requirement.ram) gameRequirement.ram = requirement.ram;
        if (requirement.storage) gameRequirement.storage = requirement.storage;
        if (requirement.network) gameRequirement.network = requirement.network;
        return gameRequirement;
    });
}

export function toOriginGameEntities(createGameDto: CreateGameDto, gameId: number): OriginGame[] {
    if (createGameDto.isOrigin || !createGameDto.originGameIds || createGameDto.originGameIds.length === 0) {
        return [];
    }
    return createGameDto.originGameIds.map(originGameId => {
        const originGame = new OriginGame();
        originGame.gameId = gameId;
        originGame.originGameId = originGameId;
        return originGame;
    });
}

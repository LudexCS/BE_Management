import {Repository} from "typeorm";
import {Resource} from "../entity/resource.entity";
import AppDataSource from "../config/mysql.config";

const resourceRepo: Repository<Resource> = AppDataSource.getRepository(Resource);

export const saveResource = async (resource: Resource) => {
    try {
        // id 반환. 다른 엔티티 저장 시 필요.
        return (await resourceRepo.save(resource)).id;
    } catch (error) {
        console.error('Failed to save resource metadata:', error);
        throw new Error('Failed to save resource metadata to database');
    }
};

export const isResourceExist = async (id: number): Promise<boolean> => {
    return await resourceRepo.exists({
        where: { id: id }
    });
}

export const updateResourceFields = async (
    gameId: number,
    partialUpdate: Partial<Resource>
): Promise<void> => {
    try {
        await resourceRepo.update({ gameId: gameId }, partialUpdate);
    } catch (error) {
        console.error("Failed to update resource fields:", error);
        throw new Error("Failed to update resource fields in database");
    }
};

export const findUserId = async (resourceId: number) => {
    const result = await resourceRepo.findOne({
        select: ['userId'],
        where: { id: resourceId },
    });
    if (!result) {
        throw new Error(`Resource with id ${resourceId} not found`);
    }
    return result.userId;
};

export const findResourceByGameId = async (gameId: number) => {
    const resource = await resourceRepo.findOne({
        where: { gameId: gameId}
    });
    return await resource;
}
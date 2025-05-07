import {Repository} from "typeorm";
import {Resource} from "../entity/resource.entity";
import AppDataSource from "../config/mysql.config";

const ResourceRepo: Repository<Resource> = AppDataSource.getRepository(Resource);

export const saveResource = async (resource: Resource) => {
    try {
        // id 반환. 다른 엔티티 저장 시 필요.
        return (await ResourceRepo.save(resource)).id;
    } catch (error) {
        console.error('Failed to save resource metadata:', error);
        throw new Error('Failed to save resource metadata to database');
    }
};

export const isResourceExist = async (id: number): Promise<boolean> => {
    return await ResourceRepo.exists({
        where: { id: id }
    });
}
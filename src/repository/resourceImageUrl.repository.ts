import {ResourceImageUrl} from "../entity/resourceImageUrl.entity";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";

const ResourceImageUrlRepo: Repository<ResourceImageUrl> = AppDataSource.getRepository(ResourceImageUrl);

export const saveResourceImageUrl = async (resourceImageUrl: ResourceImageUrl): Promise<ResourceImageUrl> => {
    try {
        return await ResourceImageUrlRepo.save(resourceImageUrl);
    } catch (error) {
        console.error('Failed to save resource image URL:', error);
        throw new Error('Failed to save resource image URL to database');
    }
};

export const findResourceImageUrlByResourceId = async (resourceId: number) => {
    const imageUrls = await ResourceImageUrlRepo.find({
        where: { resourceId}
    });
    return imageUrls.map(imageUrl => imageUrl.url);
}
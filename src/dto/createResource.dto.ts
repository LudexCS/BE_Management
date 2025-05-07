import { Resource } from "../entity/resource.entity";
import { ResourceImageUrl } from "../entity/resourceImageUrl.entity";

export interface CreateResourceDto {
    gameId: number;
    userId?: number;
    sellerRatio: number;
    creatorRatio: number;
    allowDerivation: boolean;
    additionalCondition?: string;
    description?: string;
    imageUrls?: {
        path: string;
        mimetype: string;
    }[];
}

export function toResourceEntity(dto: CreateResourceDto): Resource {
    const resource = new Resource();
    resource.gameId = dto.gameId;
    if (dto.userId !== undefined) resource.userId = dto.userId;
    resource.sellerRatio = dto.sellerRatio;
    resource.creatorRatio = dto.creatorRatio;
    resource.allowDerivation = dto.allowDerivation;
    if (dto.additionalCondition !== undefined) resource.additionalCondition = dto.additionalCondition;
    if (dto.description !== undefined) resource.description = dto.description;
    resource.downloadTimes = 0;
    resource.registeredAt = new Date();
    resource.updatedAt = new Date();
    return resource;
}

export function toResourceImageUrlEntities(imageUrls: string[], resourceId: number): ResourceImageUrl[] {
    if (!imageUrls || imageUrls.length === 0) {
        return [];
    }

    return imageUrls.map(url => {
        const resourceImageUrl = new ResourceImageUrl();
        resourceImageUrl.resourceId = resourceId;
        resourceImageUrl.url = url;
        return resourceImageUrl;
    });
}
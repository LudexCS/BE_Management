import { Resource } from "../entity/resource.entity";
import {ResourceImageUrl} from "../entity/resourceImageUrl.entity";

export interface CreateResourceDto {
  gameId: number;
  userId?: number;
  usageTypeId: number;
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
  resource.userId = dto.userId as number;
  resource.usageTypeId = dto.usageTypeId;
  resource.allowDerivation = dto.allowDerivation;
  resource.additionalCondition = dto.additionalCondition as string;
  resource.description = dto.description as string;
  resource.downloadTimes = 0;
  resource.registeredAt = new Date();
  resource.updatedAt = new Date();
  return resource;
}

export function toResourceImageUrlEntities(imageUrls: string[], resourceId: number): ResourceImageUrl[] {
    if(!imageUrls || imageUrls.length === 0) {
        return [];
    }

    return imageUrls.map(url => {
        const resourceImageUrl = new ResourceImageUrl();
        resourceImageUrl.resourceId = resourceId;
        resourceImageUrl.url = url;
        return resourceImageUrl;
    });
}
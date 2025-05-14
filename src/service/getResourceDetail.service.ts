import { findResourceByGameId} from "../repository/resource.repository";
import { findResourceImageUrlByResourceId} from "../repository/resourceImageUrl.repository";
import {ResourceDetailDto} from "../dto/resourceDetail.dto";

export const getResourceDetail = async (gameId: number): Promise<ResourceDetailDto | null> => {
    const resourceData = await findResourceByGameId(gameId);
    if(!resourceData)
        return null;
    const resourceImageUrl = await findResourceImageUrlByResourceId(resourceData.id);

    return{
        id: resourceData.id,
        gameId: resourceData.gameId,
        userId: resourceData.userId,
        sellerRatio: resourceData.sellerRatio,
        creatorRatio: resourceData.creatorRatio,
        allowDerivation: resourceData.allowDerivation,
        additionalCondition: resourceData.additionalCondition,
        description: resourceData.description,
        downloadTimes: resourceData.downloadTimes,
        sharerId: resourceData.sharerId,
        registeredAt: resourceData.registeredAt,
        updatedAt: resourceData.updatedAt,
        imageUrls: resourceImageUrl
    }
}
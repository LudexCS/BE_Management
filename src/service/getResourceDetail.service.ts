import { findResourceByGameId} from "../repository/resource.repository";
import { findResourceDownloadUrlByResourceId} from "../repository/resourceDownloadUrl.repository";
import { findResourceImageUrlByResourceId} from "../repository/resourceImageUrl.repository";
import {ResourceDetailDto} from "../dto/resourceDetail.dto";

export const getResourceDetail = async (gameId: number): Promise<ResourceDetailDto> => {
    try{
        const resourceData = await findResourceByGameId(gameId);
        const resourceImageUrl = await findResourceImageUrlByResourceId(gameId);
        const resourceDownloadUrl = await findResourceDownloadUrlByResourceId(gameId);

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
            imageUrls: resourceImageUrl,
            downloadUrls: resourceDownloadUrl
        }
    }catch(err){
        throw err;
    }
}
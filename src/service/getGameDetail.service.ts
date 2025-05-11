import {findGameDetailWithGameId} from "../repository/game.repository";
import {findTagByGameId} from "../repository/gameTag.repository";
import {findImageURLwithGameId} from "../repository/ImageUrl.repository";
import {GameDetailDto} from "../dto/gameDetail.dto";
import {findGameRequirementWithGameId} from "../repository/gameRequirement.repository";
import { getPresignedUrl } from "../service/s3.service";


export const getGameDetail = async(gameId: number) =>{
    try{
        const gameDetails = await findGameDetailWithGameId(gameId);
        const tags = await findTagByGameId(gameId);
        const imageKeys = await findImageURLwithGameId(gameId);
        const requirements = await findGameRequirementWithGameId(gameId);

        const presignedThumbnailUrl = await getPresignedUrl(gameDetails.thumbnailUrl);

        const presignedImageUrls = await Promise.all(
            imageKeys.map(key => getPresignedUrl(key))
        );

        const gameDetailDto: GameDetailDto = {
            id: gameDetails.id,
            title: gameDetails.title,
            userId: gameDetails.userId,
            nickName: gameDetails.userName,
            price: gameDetails.price,
            thumbnailUrl: presignedThumbnailUrl,
            description: gameDetails.description,
            itemId: gameDetails.itemId,
            downloadTimes: gameDetails.downloadTimes,
            registeredAt: gameDetails.registeredAt,
            updatedAt: gameDetails.updatedAt,
            tags,
            imageUrls: presignedImageUrls,
            requirements,
        };
        return gameDetailDto;
    } catch(err){
        throw err;
    }
}

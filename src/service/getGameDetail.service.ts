import {findGameDetailWithGameId} from "../repository/game.repository";
import {findTagWithGameId} from "../repository/gameTag.repository";
import {findImageURLwithGameId} from "../repository/ImageUrl.repository";
import {GameDetailDto} from "../dto/gameDetail.dto";
import {findGameRequirementWithGameId} from "../repository/gameRequirement.repository";
import { getPresignedUrl } from "../service/s3.service";


export const getGameDetail = async(gameId: number) =>{
    try{
        const gameDetails = await findGameDetailWithGameId(gameId);
        const tags = await findTagWithGameId(gameId);
        const imageKeys = await findImageURLwithGameId(gameId);
        const requirements = await findGameRequirementWithGameId(gameId);

        const presignedThumbnailUrl = await getPresignedUrl(gameDetails.thumnailUrl);

        const presignedImageUrls = await Promise.all(
            imageKeys.map(key => getPresignedUrl(key))
        );

        const gameDetailDto: GameDetailDto = {
            id: gameDetails.id,
            title: gameDetails.title,
            userId: gameDetails.userId,
            price: gameDetails.price,
            thumnailUrl: presignedThumbnailUrl,
            description: gameDetails.description,
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

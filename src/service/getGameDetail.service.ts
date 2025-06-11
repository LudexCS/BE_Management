import {findGameDetailWithGameId} from "../repository/game.repository";
import {findTagByGameId} from "../repository/gameTag.repository";
import {findImageURLwithGameId} from "../repository/gameImageUrl.repository";
import {GameDetailDto} from "../dto/gameDetail.dto";
import {findGameRequirementWithGameId} from "../repository/gameRequirement.repository";


export const getGameDetail = async(gameId: number) =>{
    const gameDetails = await findGameDetailWithGameId(gameId);
    const tags = await findTagByGameId(gameId);
    const imageUrls = await findImageURLwithGameId(gameId);
    const requirements = await findGameRequirementWithGameId(gameId);

    const gameDetailDto: GameDetailDto = {
        id: gameDetails.id,
        title: gameDetails.title,
        titleKo: gameDetails.titleKo,
        userId: gameDetails.userId,
        nickName: gameDetails.nickName,
        price: gameDetails.price,
        discountRate: gameDetails.discountRate,
        discountPrice: Number(gameDetails.discountPrice),
        thumbnailUrl: gameDetails.thumbnailUrl,
        description: gameDetails.description,
        itemId: gameDetails.itemId,
        downloadTimes: gameDetails.downloadTimes,
        registeredAt: gameDetails.registeredAt,
        updatedAt: gameDetails.updatedAt,
        tags,
        imageUrls: imageUrls,
        requirements,
        originId: gameDetails.originId
    };
    return gameDetailDto;
}


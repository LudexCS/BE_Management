import {findGameDetailWithGameId} from "../repository/game.repository";
import {findTagWithGameId} from "../repository/gameTag.repository";
import {findImageURLwithGameId} from "../repository/ImageUrl.repository";
import {GameDetailDto} from "../dto/gameDetail.dto";
import {findGameRequirementWithGameId} from "../repository/gameRequirement.repository";


export const getGameDetail = async(gameId: number) =>{
    try{
        const gameDetails = await findGameDetailWithGameId(gameId);
        const tags = await findTagWithGameId(gameId);
        const imageUrls = await findImageURLwithGameId(gameId);
        const requirements = await findGameRequirementWithGameId(gameId);

        const gameDetailDto: GameDetailDto = {
            id: gameDetails.id,
            title: gameDetails.title,
            userId: gameDetails.userId,
            price: gameDetails.price,
            thumnailUrl: gameDetails.thumnailUrl,
            description: gameDetails.description,
            registeredAt: gameDetails.registeredAt,
            updatedAt: gameDetails.updatedAt,
            tags,
            imageUrls,
            requirements,
        };
        return gameDetailDto;
    } catch(err){
        throw err;
    }
}

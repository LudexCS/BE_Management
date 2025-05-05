import {
    CreateGameDto,
    toGameEntity,
    toGameImageUrlEntities,
    toGameRequirementEntities,
    toGameTagEntities, toOriginGameEntities
} from "../dto/createGame.dto";
import {saveGame} from "../repository/game.repository";
import {saveGameImageUrl} from "../repository/gameImageUrl.repository";
import {saveGameRequirement} from "../repository/gameRequirement.repository";
import {saveGameTag} from "../repository/gameTag.repository";
import {saveOriginGame} from "../repository/originGame.repository";
import {uploadToS3} from "./s3.service";

export const registerGame = async (createGameDto: CreateGameDto) => {
    try {
        const game = toGameEntity(createGameDto);
        const gameId = await saveGame(game);

        const gameImageUrls = toGameImageUrlEntities(createGameDto, gameId);

        for (const imageUrl of gameImageUrls) {
            const s3Url = await uploadToS3(imageUrl);
            imageUrl.url = s3Url;
            await saveGameImageUrl(imageUrl);
        }

        const gameTags = toGameTagEntities(createGameDto, gameId);
        gameTags.forEach(saveGameTag);

        const gameRequirements = toGameRequirementEntities(createGameDto, gameId);
        gameRequirements.forEach(saveGameRequirement);

        const originGames = toOriginGameEntities(createGameDto, gameId);
        originGames.forEach(saveOriginGame);

    } catch (error) {
        throw error;
    }
}
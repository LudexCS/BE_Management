import {
    CreateGameDto,
    toGameEntity,
    toGameImageUrlEntities,
    toGameRequirementEntities,
    toGameTagEntities,
    toOriginGameEntities
} from "../dto/createGame.dto";
import {saveGame, updateGameFields} from "../repository/game.repository";
import {saveGameImageUrl} from "../repository/gameImageUrl.repository";
import {saveGameRequirement} from "../repository/gameRequirement.repository";
import {saveGameTag} from "../repository/gameTag.repository";
import {saveOriginGame} from "../repository/originGame.repository";
import {uploadGameImageToS3, uploadResourceImageToS3} from "./s3.service";
import {CreateResourceDto, toResourceEntity, toResourceImageUrlEntities} from "../dto/createResource.dto";
import {saveResource} from "../repository/resource.repository";
import {saveResourceImageUrl} from "../repository/resourceImageUrl.repository";

export const registerGame = async (createGameDto: CreateGameDto) => {
    try {
        const game = toGameEntity(createGameDto);
        const gameId = await saveGame(game);
        const thumbnailUrl = { thumbnailUrl: await uploadGameImageToS3(createGameDto.thumbnailUrl, gameId) };
        await updateGameFields(gameId, thumbnailUrl);

        let imageUrls: string[] = [];
        if (createGameDto.imageUrls && createGameDto.imageUrls.length > 0) {
            imageUrls = await Promise.all(
                createGameDto.imageUrls.map(image => uploadGameImageToS3(image, gameId))
            );
        }
        const gameImageUrls = toGameImageUrlEntities(imageUrls, gameId);
        await Promise.all(gameImageUrls.map(saveGameImageUrl));

        const gameTags = toGameTagEntities(createGameDto, gameId);
        await Promise.all(gameTags.map(saveGameTag));

        const gameRequirements = toGameRequirementEntities(createGameDto, gameId);
        await Promise.all(gameRequirements.map(saveGameRequirement));

        const originGames = toOriginGameEntities(createGameDto, gameId);
        await Promise.all(originGames.map(saveOriginGame));
        return gameId;
    } catch (error) {
        throw error;
    }
};

export const registerResource = async (createResourceDto: CreateResourceDto) => {
    try {
        const resource = toResourceEntity(createResourceDto);
        const resourceId = await saveResource(resource);

        let imageUrls: string[] = [];
        if (createResourceDto.imageUrls && createResourceDto.imageUrls.length > 0) {
            imageUrls = await Promise.all(
                createResourceDto.imageUrls.map(image => uploadResourceImageToS3(image, resourceId))
            );
        }
        const resourceImageUrls = toResourceImageUrlEntities(imageUrls, resourceId);
        await Promise.all(resourceImageUrls.map(saveResourceImageUrl));
        return resourceId;
    } catch (error) {
        throw error;
    }
};
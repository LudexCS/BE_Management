import {
    CreateGameDto,
    toGameEntity,
    toGameImageUrlEntities,
    toGameRequirementEntities,
    toGameTagEntities
} from "../dto/createGame.dto"
import {updateGameFields} from "../repository/game.repository";
import {uploadGameImageToS3, uploadResourceImageToS3} from "./s3.service";
import {saveGameImageUrl} from "../repository/gameImageUrl.repository";
import {saveGameTag} from "../repository/gameTag.repository";
import {saveGameRequirement} from "../repository/gameRequirement.repository";
import {CreateResourceDto, toResourceEntity, toResourceImageUrlEntities} from "../dto/createResource.dto";
import {saveResourceImageUrl} from "../repository/resourceImageUrl.repository";
import { updateResourceFields } from "../repository/resource.repository"

export const updateGameData = async (dto: CreateGameDto, gameId: number) => {
    await updateGameFields(gameId, toGameEntity(dto));

    const { url, key } = await uploadGameImageToS3(dto.thumbnailUrl, gameId);
    await updateGameFields(gameId, { thumbnailUrl: url, key });

    if (dto.imageUrls?.length) {
        const uploaded = await Promise.all(dto.imageUrls.map(img => uploadGameImageToS3(img, gameId)));
        const gameImageUrls = toGameImageUrlEntities(uploaded, gameId);
        await Promise.all(gameImageUrls.map(saveGameImageUrl));
    }

    const gameTags = toGameTagEntities(dto, gameId);
    await Promise.all(gameTags.map(saveGameTag));

    const requirements = toGameRequirementEntities(dto, gameId);
    await Promise.all(requirements.map(saveGameRequirement));
};

export const updateResourceData = async (dto: CreateResourceDto) => {
    await updateResourceFields(dto.gameId, toResourceEntity(dto));

    if (dto.imageUrls?.length) {
        const uploaded = await Promise.all(dto.imageUrls.map(img => uploadResourceImageToS3(img, dto.gameId)));
        const imageEntities = toResourceImageUrlEntities(uploaded, dto.gameId);
        await Promise.all(imageEntities.map(saveResourceImageUrl));
    }
};
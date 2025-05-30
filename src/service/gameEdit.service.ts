import {
    CreateGameDto,
    toGameEntity,
    toGameImageUrlEntities,
    toGameRequirementEntities,
    toGameTagEntities
} from "../dto/createGame.dto"
import {updateGameFields} from "../repository/game.repository";
import {deleteFromS3, uploadGameImageToS3, uploadResourceImageToS3} from "./s3.service";
import {
    deleteGameImageUrlsByGameId,
    findGameImageUrlsByGameId,
    saveGameImageUrl
} from "../repository/gameImageUrl.repository";
import {deleteGameTagsByGameId, saveGameTag} from "../repository/gameTag.repository";
import {deleteGameRequirementsByGameId, saveGameRequirement} from "../repository/gameRequirement.repository";
import {CreateResourceDto, toResourceEntity, toResourceImageUrlEntities} from "../dto/createResource.dto";
import {saveResourceImageUrl, findResourceImageUrlsByResourceId, deleteResourceImageUrlsByResourceId} from "../repository/resourceImageUrl.repository";
import {findResourceByGameId, updateResourceFields} from "../repository/resource.repository"
import {Resource} from "../entity/resource.entity";

export const updateGameData = async (dto: CreateGameDto, gameId: number) => {
    await updateGameFields(gameId, toGameEntity(dto));

    const { url, key } = await uploadGameImageToS3(dto.thumbnailUrl, gameId);
    await updateGameFields(gameId, { thumbnailUrl: url, key });

    const existingImages = await findGameImageUrlsByGameId(gameId); // [{ url, key }]
    await Promise.all(existingImages.map(img => deleteFromS3(img.key)));
    await deleteGameImageUrlsByGameId(gameId);


    if (dto.imageUrls?.length) {
        const uploaded = await Promise.all(dto.imageUrls.map(img => uploadGameImageToS3(img, gameId)));
        const gameImageUrls = toGameImageUrlEntities(uploaded, gameId);
        await Promise.all(gameImageUrls.map(saveGameImageUrl));
    }

    await deleteGameTagsByGameId(gameId);
    const gameTags = toGameTagEntities(dto, gameId);
    await Promise.all(gameTags.map(saveGameTag));

    await deleteGameRequirementsByGameId(gameId);
    const requirements = toGameRequirementEntities(dto, gameId);
    await Promise.all(requirements.map(saveGameRequirement));


};

export const updateResourceData = async (dto: CreateResourceDto) => {
    await updateResourceFields(dto.gameId, toResourceEntity(dto));

    if (dto.imageUrls?.length) {
        const resource = await findResourceByGameId(dto.gameId);
        if (!resource) {
            throw new Error(`Resource not found for gameId ${dto.gameId}`);
        }
        const existingImages = await findResourceImageUrlsByResourceId(resource.id); // [{ url, key }[]]
        await Promise.all(existingImages.map(img => deleteFromS3(img.key)));
        await deleteResourceImageUrlsByResourceId(resource.id);

        const uploaded = await Promise.all(dto.imageUrls.map(img => uploadResourceImageToS3(img, resource.id)));
        const imageEntities = toResourceImageUrlEntities(uploaded, resource.id);
        await Promise.all(imageEntities.map(saveResourceImageUrl));
    }
};
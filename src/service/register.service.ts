import {
    CreateGameDto,
    toGameEntity,
    toGameImageUrlEntities,
    toGameRequirementEntities,
    toGameTagEntities,
    toOriginGameEntities
} from "../dto/createGame.dto";
import {findTitleById, saveGame, updateGameFields} from "../repository/game.repository";
import {saveGameImageUrl} from "../repository/gameImageUrl.repository";
import {saveGameRequirement} from "../repository/gameRequirement.repository";
import {saveGameTag} from "../repository/gameTag.repository";
import {saveOriginGame} from "../repository/originGame.repository";
import {uploadGameImageToS3, uploadResourceImageToS3} from "./s3.service";
import {CreateResourceDto, toResourceEntity, toResourceImageUrlEntities} from "../dto/createResource.dto";
import {saveResource} from "../repository/resource.repository";
import {saveResourceImageUrl} from "../repository/resourceImageUrl.repository";
import {Tag} from "../entity/tag.entity";
import {saveTag} from "../repository/tag.repository";
import {GameTag} from "../entity/gameTag.entity";

export const registerGame = async (createGameDto: CreateGameDto) => {
    const game = toGameEntity(createGameDto);
    const gameId = await saveGame(game);
    const { url, key } = await uploadGameImageToS3(createGameDto.thumbnailUrl, gameId);
    await updateGameFields(gameId, { thumbnailUrl: url, key: key });

    let imageUrls: { url: string, key: string }[] = [];
    if (createGameDto.imageUrls && createGameDto.imageUrls.length > 0) {
        imageUrls = await Promise.all(
            createGameDto.imageUrls.map( image => uploadGameImageToS3(image, gameId))
        );
    }
    const gameImageUrls = toGameImageUrlEntities(imageUrls, gameId);
    await Promise.all(gameImageUrls.map(saveGameImageUrl));

    const originGames = toOriginGameEntities(createGameDto, gameId);
    await Promise.all(originGames.map(saveOriginGame));

    const originGameTitles = await Promise.all(originGames.map(originGame => {
        const gameId = originGame.originGameId;
        return findTitleById(gameId);
    }));

    const tags = originGameTitles.map(title => {
        const tag = new Tag();
        tag.name = title;
        return tag;
    });
    const tagIds = await Promise.all(tags.map(saveTag));

    const gameTags = toGameTagEntities(createGameDto, gameId);
    tagIds.map(tagId => {
        const gameTag = new GameTag();
        gameTag.gameId = gameId;
        gameTag.tagId = tagId;
        gameTag.priority = 1;
        gameTags.push(gameTag);
    });
    await Promise.all(gameTags.map(saveGameTag));

    const gameRequirements = toGameRequirementEntities(createGameDto, gameId);
    await Promise.all(gameRequirements.map(saveGameRequirement));

    return gameId;
};

export const registerResource = async (createResourceDto: CreateResourceDto) => {
    const resource = toResourceEntity(createResourceDto);
    const resourceId = await saveResource(resource);

    let imageUrls: { url: string, key: string }[] = [];
    if (createResourceDto.imageUrls && createResourceDto.imageUrls.length > 0) {
        imageUrls = await Promise.all(
            createResourceDto.imageUrls.map(image => uploadResourceImageToS3(image, resourceId))
        );
    }
    const resourceImageUrls = toResourceImageUrlEntities(imageUrls, resourceId);
    await Promise.all(resourceImageUrls.map(saveResourceImageUrl));
    return resourceId;
};
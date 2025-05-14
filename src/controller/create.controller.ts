import {CreateGameDto} from "../dto/createGame.dto";
import {getUserIdByEmail} from "../grpc/auth.client";
import {registerGame, registerResource} from "../service/register.service";
import {CreateResourceDto} from "../dto/createResource.dto";

export const createGameControl = async (createGameDto: CreateGameDto, email: string) => {
    if (createGameDto.isOrigin && createGameDto.originGameIds) {
        throw new Error("originGameIds must not exist when isOrigin is true");
    }
    if (!createGameDto.isOrigin && !Array.isArray(createGameDto.originGameIds)) {
        throw new Error("originGameIds must be provided when isOrigin is false");
    }
    createGameDto.userId = await getUserIdByEmail(email);
    return await registerGame(createGameDto);
};

export const createResourceControl = async (createResourceDto: CreateResourceDto, email: string) => {
    createResourceDto.userId = await getUserIdByEmail(email);
    return await registerResource(createResourceDto);
};
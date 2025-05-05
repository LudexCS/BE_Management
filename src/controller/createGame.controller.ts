import {CreateGameDto} from "../dto/createGame.dto";
import {getUserIdByEmail} from "../grpc/auth.client";
import {registerGame} from "../service/registerGame.service";

export const createGameControl = async (createGameDto: CreateGameDto, email: string) => {
    try {
        if (createGameDto.isOrigin && createGameDto.originGameIds) {
            throw new Error("originGameIds must not exist when isOrigin is true");
        }
        if (!createGameDto.isOrigin && !Array.isArray(createGameDto.originGameIds)) {
            throw new Error("originGameIds must be provided when isOrigin is false");
        }
        createGameDto.userId = await getUserIdByEmail(email);
        await registerGame(createGameDto);
    } catch (error) {
        throw error;
    }


}
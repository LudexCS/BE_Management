import { Request, Response } from 'express';
import {updateGameData, updateResourceData} from '../service/gameEdit.service';
import {CreateGameDto} from "../dto/createGame.dto"
import {getUserIdByEmail} from "../grpc/auth.client";
import {CreateResourceDto} from "../dto/createResource.dto";

export async function updateGameDataControl(dto: CreateGameDto, email: string, gameId: number) {
        dto.userId = await getUserIdByEmail(email);
        await updateGameData(dto, gameId);

}

export const updateResourceControl = async (dto: CreateResourceDto, email: string) => {
        dto.userId = await getUserIdByEmail(email);
        await updateResourceData(dto);
};
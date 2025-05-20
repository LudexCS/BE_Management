import { Request, Response } from 'express';
import { updateGameData } from '../service/gameEdit.service';
import { GameDataDto } from '../dto/gameEdit.dto'

export async function updateGameDataControl(email: string, gameId: number, dto: GameDataDto) {
        await updateGameData(email, gameId, dto);

}
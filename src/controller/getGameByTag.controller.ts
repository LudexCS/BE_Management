import { Request, Response } from 'express'
import { findGameWithTagService } from '../service/findGameWithTag.service'

export const getGameByTagControl = async (tags: string[]) => {
    try {
        const games = await findGameWithTagService(tags);
        return games;
    } catch (err) {
        throw err;
    }
};

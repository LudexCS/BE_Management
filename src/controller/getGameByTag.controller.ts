import { Request, Response } from 'express'
import { findGameWithTagService } from '../service/findGameWithTag.service'

export const getGameByTagControl = async (req: Request) => {
    const tags = req.body.tags as string[];
    try {
        const games = await findGameWithTagService(tags);
    } catch (err) {
        throw err;
    }
};

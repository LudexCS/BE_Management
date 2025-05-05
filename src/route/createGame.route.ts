import {Request, Response, Router} from "express";
import {createGameControl} from "../controller/createGame.controller";

const router: Router = Router();

router.post('/game', async (req: Request, res: Response) => {
    try {
        await createGameControl(req);
        res.status(201).json({message: "Game created"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
});

export default router;
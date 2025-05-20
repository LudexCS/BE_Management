import { Request, Response, Router } from "express";
import {GameDataDto} from "../dto/gameEdit.dto";
import {updateGameDataControl} from "../controller/gameEdit.controller";

const router: Router = Router();


router.get('/edit', async (req: Request, res: Response) => {
    try {
        const email = req.user as string;
        const gameId = parseInt(req.params.gameId, 10);
        const dto: GameDataDto = req.body;

        await updateGameDataControl(email, gameId, dto);
        res.status(200).json({message: "게임 정보 수정 완료"});
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
import {Request, Response, Router} from "express";
import { loadGameListControl, showOriginGameHierarchyControl, showVarientGameHierarchyControl } from "../controller/showGameList.controller"

const router: Router = Router();

router.post('/games/list', async (req: Request, res: Response) => {
    try {
        const gameList = await loadGameListControl(req);
        res.status(200).json(gameList);
    } catch (error) {
        console.error('게임 목록 조회 실패:', error);
        res.status(500).json({ message: '게임 목록 조회 중 오류 발생' });
    }
});

router.post('/games/origin', async (req: Request, res: Response) => {
    try {
        const originGames = await showOriginGameHierarchyControl(req);
        res.status(200).json(originGames);
    } catch (error) {
        console.error('원본 게임 조회 실패:', error);
        res.status(500).json({ message: '원본 게임 조회 중 오류 발생' });
    }
});

router.post('/games/variant', async (req: Request, res: Response) => {
    try {
        const variantGames = await showVarientGameHierarchyControl(req);
        res.status(200).json(variantGames);
    } catch (error) {
        console.error('파생 게임 조회 실패:', error);
        res.status(500).json({ message: '파생 게임 조회 중 오류 발생' });
    }
});
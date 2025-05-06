import { Request, Response, Router } from "express";
import {
    loadGameListControl,
    showOriginGameHierarchyControl,
    showVarientGameHierarchyControl
} from "../controller/showGameList.controller";
import { getGameByTagControl } from "../controller/getGameByTag.controller";
import { getGameDetailControl } from "../controller/getGameDetail.controller";

const router: Router = Router();

/**
 * @swagger
 * /api/games/list:
 *   get:
 *     summary: 게임 목록 조회
 *     description: 페이지네이션 및 정렬 기준에 따라 게임 목록을 조회합니다.
 *     tags: [GameList]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: sort
 *         required: true
 *         schema:
 *           type: string
 *           enum: [popularity, latest, download_times]
 *         description: 정렬 기준
 *     responses:
 *       200:
 *         description: 게임 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetailDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/games/list', async (req: Request, res: Response) => {
    try {
        const gameList = await loadGameListControl(req);
        res.status(200).json(gameList);
    } catch (error) {
        res.status(500).json({ message: '게임 목록 조회 중 오류 발생' });
    }
});

/**
 * @swagger
 * /api/games/origin:
 *   get:
 *     summary: 원본 게임 목록 조회
 *     description: 파생 게임의 원본 게임 목록을 반환합니다.
 *     tags: [GameList]
 *     parameters:
 *       - in: query
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 파생 게임의 ID
 *     responses:
 *       200:
 *         description: 원본 게임 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetailDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/games/origin', async (req: Request, res: Response) => {
    try {
        const originGames = await showOriginGameHierarchyControl(req);
        res.status(200).json(originGames);
    } catch (error) {
        res.status(500).json({ message: '원본 게임 조회 중 오류 발생' });
    }
});

/**
 * @swagger
 * /api/games/variant:
 *   get:
 *     summary: 파생 게임 목록 조회
 *     description: 특정 원본 게임의 파생 게임 목록을 조회합니다.
 *     tags: [GameList]
 *     parameters:
 *       - in: query
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 원본 게임 ID
 *     responses:
 *       200:
 *         description: 파생 게임 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetailDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/games/variant', async (req: Request, res: Response) => {
    try {
        const variantGames = await showVarientGameHierarchyControl(req);
        res.status(200).json(variantGames);
    } catch (error) {
        res.status(500).json({ message: '파생 게임 조회 중 오류 발생' });
    }
});

/**
 * @swagger
 * /api/games/byTags:
 *   post:
 *     summary: 태그 기반 게임 검색
 *     description: 태그 배열을 기반으로 해당 조건을 만족하는 게임들을 조회합니다.
 *     tags: [GameList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 검색할 태그 목록
 *     responses:
 *       200:
 *         description: 조건에 맞는 게임 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameDetailDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post('/games/byTags', async (req: Request, res: Response) => {
    try {
        const games = await getGameByTagControl(req);
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ message: '태그로 게임 불러오기 실패' });
    }
});

/**
 * @swagger
 * /api/game/{game_id}:
 *   get:
 *     summary: 특정 게임 상세 정보 조회
 *     description: 게임 ID를 통해 게임 상세 정보를 조회합니다.
 *     tags: [Game]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 게임 ID
 *     responses:
 *       200:
 *         description: 게임 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameDetailDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/games/:game_id', async (req: Request, res: Response) => {
    try {
        const gameDetails = await getGameDetailControl(req);
        res.status(200).json(gameDetails);
    } catch (err) {
        res.status(500).json({ message: '게임 정보 불러오기 오류 발생' });
    }
});

export default router;

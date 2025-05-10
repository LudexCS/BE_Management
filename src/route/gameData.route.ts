import { Request, Response, Router } from "express";
import {
    loadGameListControl,
    showOriginGameHierarchyControl,
    showVarientGameHierarchyControl
} from "../controller/showGameList.controller";
import { getGameByTagControl } from "../controller/getGameByTag.controller";
import { getGameDetailControl } from "../controller/getGameDetail.controller";
import {GameListRequestDto} from "../dto/gameListRequest.dto";
/**
 * @swagger
 * components:
 *   schemas:
 *     GameRequirementDto:
 *       type: object
 *       properties:
 *         os:
 *           type: string
 *         cpu:
 *           type: string
 *         ram:
 *           type: string
 *         gpu:
 *           type: string
 *         storage:
 *           type: string

 *     GameDetailDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         userId:
 *           type: integer
 *         price:
 *           type: number
 *           format: float
 *         thumbnailUrl:
 *           type: string
 *           format: uri
 *         description:
 *           type: string
 *         item_id:
 *           type: bigint
 *         registeredAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *         requirements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GameRequirementDto'

 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

const router: Router = Router();

/**
 * @swagger
 * /api/get/list:
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
router.get('/list', async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;

        const gameListRequestDto: GameListRequestDto = {
            page: Number(page),
            limit: Number(limit),
        };
        const gameList = await loadGameListControl(gameListRequestDto);
        res.status(200).json(gameList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/get/origin:
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
router.get('/origin', async (req: Request, res: Response) => {
    try {
        const gameId = Number(req.query.gameId);
        const originGames = await showOriginGameHierarchyControl(gameId);
        res.status(200).json(originGames);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/get/variant:
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
router.get('/variant', async (req: Request, res: Response) => {
    try {
        const gameId = Number(req.query.gameId);
        const variantGames = await showVarientGameHierarchyControl(gameId);
        res.status(200).json(variantGames);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/get/byTags:
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
router.post('/byTags', async (req: Request, res: Response) => {
    try {
        console.log("🔥 req.headers.content-type:", req.headers['content-type']);
        console.log("🔥 req.body:", req.body);
        const { tags } = req.body || {} ;
        if (!Array.isArray(tags)) {
            res.status(400).json({ message: 'tags 배열이 필요합니다.' });
        }
        const games = await getGameByTagControl(tags);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/get/gameDetail:
 *   get:
 *     summary: 특정 게임 상세 정보 조회
 *     description: 게임 ID를 통해 게임 상세 정보를 조회합니다.
 *     tags: [Game]
 *     parameters:
 *       - in: query
 *         name: gameId
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
router.get('/gameDetail', async (req: Request, res: Response) => {
    try {
        const gameId = Number(req.query.gameId);
        const gameDetails = await getGameDetailControl(gameId);
        res.status(200).json(gameDetails);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;

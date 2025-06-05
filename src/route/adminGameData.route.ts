import { Request, Response, Router } from "express";
import {
    adminLoadGameListControl, adminShowOriginGameHierarchyControl, adminShowVarientGameHierarchyControl,
} from "../controller/showGameList.controller";
import {adminGetGameByTagControl} from "../controller/getGameByTag.controller";
import {GameListRequestDto} from "../dto/gameListRequest.dto";
import {adminSearchGameControl} from "../controller/search.controller";


/**
 * @swagger
 * components:
 *   schemas:
 *     GameRequirementDto:
 *       type: object
 *       properties:
 *         isMinimum:
 *           type: boolean
 *           description: 최소 사양 여부
 *         os:
 *           type: string
 *           nullable: true
 *         cpu:
 *           type: string
 *           nullable: true
 *         ram:
 *           type: string
 *           nullable: true
 *         gpu:
 *           type: string
 *           nullable: true
 *         storage:
 *           type: string
 *           nullable: true
 *         network:
 *           type: string
 *           nullable: true
 *     GameListDto:
 *       type: object
 *       properties:
 *         gameId:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Space Blaster"
 *         thumbnailUrl:
 *           type: string
 *           example: "https://your-s3-url.com/space-blaster.jpg"
 *         itemId:
 *           type: string
 *           example: "abc123"
 *         price:
 *           type: string
 *           example: "9900"
 *         description:
 *           type: string
 *           example: "A fast-paced space shooter game."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["action", "rpg", "indie"]
 *         isBlocked:
 *           type: boolean
 *           example: false
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

const router: Router = Router();

/**
 * @swagger
 * /api/admin/get/list:
 *   get:
 *     summary: 게임 목록 조회
 *     description: 페이지네이션 및 정렬 기준에 따라 게임 목록을 조회합니다.
 *     tags: [GameList]
 *     security:
 *     - bearerAuth: []
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
 *                 $ref: '#/components/schemas/GameListDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/list', async (req: Request, res: Response) => {
    try {
        const { page, limit} = req.query;

        const gameListRequestDto: GameListRequestDto = {
            page: Number(page),
            limit: Number(limit),
        };
        const gameList = await adminLoadGameListControl(gameListRequestDto);
        res.status(200).json(gameList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/admin/get/origin:
 *   get:
 *     summary: 원본 게임 목록 조회
 *     description: 파생 게임의 원본 게임 목록을 반환합니다.
 *     tags: [GameList]
 *     security:
 *       - bearerAuth: []
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
 *                 $ref: '#/components/schemas/GameListDto'
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
        const originGames = await adminShowOriginGameHierarchyControl(gameId);
        res.status(200).json(originGames);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/admin/get/variant:
 *   get:
 *     summary: 파생 게임 목록 조회
 *     description: 특정 원본 게임의 파생 게임 목록을 조회합니다.
 *     tags: [GameList]
 *     security:
 *       - bearerAuth: []
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
 *                 $ref: '#/components/schemas/GameListDto'
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
        const variantGames = await adminShowVarientGameHierarchyControl(gameId);
        res.status(200).json(variantGames);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});


/**
 * @swagger
 * /api/admin/get/byTags:
 *   post:
 *     summary: 태그 기반 게임 검색
 *     description: 입력한 태그들을 모두 포함하는 게임 목록을 조회하며, 각 게임의 전체 태그 목록을 함께 반환합니다.
 *     tags: [GameList]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["action", "rpg"]
 *     responses:
 *       200:
 *         description: 조건에 맞는 게임 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GamesListDto'
 *       400:
 *         description: "잘못된 요청 (예: tags가 배열이 아님)"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post('/byTags', async (req: Request, res: Response) => {
    try {
        const { tags } = req.body;
        if (!Array.isArray(tags)) {
            res.status(400).json({ message: 'tags는 문자열 배열이어야 합니다.' });
        }

        const games = await adminGetGameByTagControl(tags);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/admin/get/search:
 *   post:
 *     summary: 키워드 기반 게임 검색
 *     description: 입력된 키워드에 따라 게임 제목, 설명, 태그 등에 일치하는 게임 목록을 반환합니다.
 *     tags: [GameList]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - keyword
 *             properties:
 *               keyword:
 *                 type: string
 *                 example: "action"
 *     responses:
 *       200:
 *         description: 조건에 맞는 게임 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GamesListDto'
 *       500:
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post('/search', async (req: Request, res: Response) => {
    try{
        const keyword = req.body.keyword as string;
        const games = await adminSearchGameControl(keyword);
        res.status(200).json(games);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;

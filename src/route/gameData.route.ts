import { Request, Response, Router } from "express";
import {
    loadGameListControl,
    showOriginGameHierarchyControl,
    showVarientGameHierarchyControl
} from "../controller/showGameList.controller";
import { getGameByTagControl } from "../controller/getGameByTag.controller";
import { getGameDetailControl } from "../controller/getGameDetail.controller";
import {GameListRequestDto} from "../dto/gameListRequest.dto";
import {getResourceDetailControl} from "../controller/getResourceDetail.controller";
import {searchGameControl} from "../controller/getGameBySearch.controller";


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
 *
 *     GamesListDto:
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
 *
 *     GameDetailDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         userId:
 *           type: integer
 *         userName:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         thumbnailUrl:
 *           type: string
 *           format: uri
 *         description:
 *           type: string
 *         itemId:
 *           type: integer
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
 *
 *     ResourceDetailDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         gameId:
 *           type: integer
 *         userId:
 *           type: integer
 *         sellerRatio:
 *           type: integer
 *         creatorRatio:
 *           type: integer
 *         allowDerivation:
 *           type: boolean
 *         additionalCondition:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         downloadTimes:
 *           type: integer
 *         sharerId:
 *           type: integer
 *         registeredAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *         downloadUrls:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *
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
 *     description: 입력한 태그들을 모두 포함하는 게임들을 조회하고, 각 게임의 전체 태그 목록도 함께 반환합니다.
 *     tags: [GameList]
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
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: 서버 오류
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

        const games = await getGameByTagControl(tags);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/get/search:
 *   post:
 *     summary: 키워드 기반 게임 검색
 *     description: 입력된 키워드에 따라 게임 리스트를 반환
 *     tags: [GameList]
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
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.post('/search', async (req: Request, res: Response) => {
    try{
        const keyword = req.body.keyword as string;
        const games = await searchGameControl(keyword);
        res.status(200).json(games);
    }catch(error){
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

/**
 * @swagger
 * /api/get/resourceDetail:
 *   get:
 *     summary: 게임 ID 기반 리소스 상세 조회
 *     description: 특정 게임 ID에 해당하는 리소스의 상세 정보를 반환합니다.
 *     tags: [Resource]
 *     parameters:
 *       - in: query
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 리소스를 조회할 게임 ID
 *     responses:
 *       200:
 *         description: 리소스 상세 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ResourceDetailDto'
 *                 - type: array
 *                   items: {}  # 빈 배열을 의미
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 */
router.get('/resourceDetail', async (req: Request, res: Response) => {
    try{
        const gameId = Number(req.query.gameId);
        const resourceDetails = await getResourceDetailControl(gameId);
        if(!resourceDetails)
            res.status(200).json([]);
        res.status(200).json(resourceDetails);
    }catch(error){
        res.status(500).json({ message: (error as Error).message });
    }
})

export default router;

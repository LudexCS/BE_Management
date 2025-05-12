import {Request, Response, Router} from "express";
import { getTradeHistoryControl } from "../controller/tradeInfo.controller";
import { TradeHistoryDto } from "../dto/tradeInfoRawDto"

/**
 * @swagger
 * components:
 *   schemas:
 *     GameRequirementDto:
 *       type: object
 *       properties:
 *         isMinimum:
 *           type: boolean
 *           description: 최소 사양 여부 (true면 최소, false면 권장)
 *         os:
 *           type: string
 *           nullable: true
 *           description: 운영체제
 *         cpu:
 *           type: string
 *           nullable: true
 *           description: 프로세서
 *         gpu:
 *           type: string
 *           nullable: true
 *           description: 그래픽 카드
 *         ram:
 *           type: string
 *           nullable: true
 *           description: 메모리
 *         storage:
 *           type: string
 *           nullable: true
 *           description: 저장 공간
 *         network:
 *           type: string
 *           nullable: true
 *           description: 네트워크 요구사항
 *     GameTradeDto:
 *       type: object
 *       properties:
 *         gameId:
 *           type: number
 *         userId:
 *           type: number
 *         title:
 *           type: string
 *         price:
 *           type: string
 *         description:
 *           type: string
 *         thumbnailUrl:
 *           type: string
 *         itemId:
 *           type: integer
 *         requirement:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GameRequirementDto'
 *     ResourceTradeDto:
 *       type: object
 *       properties:
 *         resourceId:
 *           type: number
 *         userId:
 *           type: number
 *         description:
 *           type: string
 *         sharerId:
 *           type: number
 *         sellerRatio:
 *           type: string
 *         createrRatio:
 *           type: string
 *         imageUrl:
 *           type: string
 *         gameId:
 *           type: number
 *     TradeHistoryDto:
 *       type: object
 *       properties:
 *         purchased:
 *           type: object
 *           properties:
 *             games:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameTradeDto'
 *             resources:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResourceTradeDto'
 *         sold:
 *           type: object
 *           properties:
 *             games:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GameTradeDto'
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 응답 메시지
 */

const router: Router = Router();

/**
 * @swagger
 * /api/protected/get/tradeInfo:
 *   get:
 *     summary: 사용자 거래 내역 조회
 *     description: 특정 사용자의 게임 및 리소스 거래 내역을 조회합니다.
 *     tags: [TradeInfo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 거래 내역 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TradeHistoryDto'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Me ssageResponse'
 */
router.get('/tradeInfo', async (req: Request, res: Response) => {
    try {
        const email = req.user as string;
        const tradeHistory: TradeHistoryDto = await getTradeHistoryControl(email);
        res.status(200).json(tradeHistory);
    } catch (error) {
        res.status(404).json({ message:(error as Error).message});
    }
});

export default router;
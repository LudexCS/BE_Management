import {Request, Response, Router} from "express";
import { getTradeHistoryControl } from "../controller/tradeInfo.controller";
import { TradeHistoryDto } from "../dto/tradeInfoRawDto"

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     GameTradeDto:
 *       type: object
 *       properties:
 *         game_id:
 *           type: number
 *         user_id:
 *           type: number
 *         title:
 *           type: string
 *         price:
 *           type: string
 *         description:
 *           type: string
 *         thumbnail_url:
 *           type: string
 *         item_id:
 *           type: bigint
 *         requirement:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GameRequirementDto'

 *     ResourceTradeDto:
 *       type: object
 *       properties:
 *         resource_id:
 *           type: number
 *         user_id:
 *           type: number
 *         description:
 *           type: string
 *         sharer_id:
 *           type: number
 *         seller_ratio:
 *           type: string
 *         creater_ratio:
 *           type: string
 *         image_url:
 *           type: string
 *         game_id:
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
 *               $ref: '#/components/schemas/MessageResponse'
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
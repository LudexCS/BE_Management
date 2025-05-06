import {Request, Response, Router} from "express";
import { getTradeHistoryControl } from "../controller/tradeInfo.controller";
import { TradeHistoryDto } from "../dto/tradeInfoRawDto"

/**
 * @swagger
 * components:
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
 *         thumnail_url:
 *           type: string
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
 *         usage_type_id:
 *           type: string
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

const router = Router();

/**
 * @swagger
 * /api/{user_id}/tradeInfo:
 *   get:
 *     summary: 사용자 거래 내역 조회
 *     description: 특정 사용자의 게임 및 리소스 거래 내역을 조회합니다.
 *     tags: [TradeInfo]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 거래 내역을 조회할 사용자 ID
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
router.get('/:user_id', async (req: Request, res: Response) => {
    try {
        const tradeHistory: TradeHistoryDto = await getTradeHistoryControl(parseInt(req.params.userId, 10));
        res.status(200).json(tradeHistory);
    } catch (error) {
        res.status(500).json({ message: '게임 거래 내역 불러오기 실패' });
    }
});

export default router;

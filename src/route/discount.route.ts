import {Router} from "express";
import {DiscountRequestDto, DiscountResponseDto} from "../dto/discount.dto";
import {getUserIdByEmail} from "../grpc/auth.client";
import {registerDiscountControl} from "../controller/discount.controller";

/**
 * @swagger
 * components:
 *   schemas:
 *     DiscountRequestDto:
 *       type: object
 *       properties:
 *         gameId:
 *           type: integer
 *           example: 42
 *         discountPrice:
 *           type: string
 *           example: "9.99"
 *         startsAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-15T00:00:00Z"
 *         endsAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-20T00:00:00Z"
 *     DiscountResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         gameId:
 *           type: integer
 *           example: 42
 *         userId:
 *           type: integer
 *           example: 7
 *         discountRate:
 *           type: integer
 *           example: 20
 *         discountPrice:
 *           type: string
 *           example: "9.99"
 *         startsAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-15T00:00:00Z"
 *         endsAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-20T00:00:00Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-10T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-06-10T12:00:00Z"
 */

const router: Router = Router();

/**
 * @swagger
 * /api/protected/discount/register:
 *   post:
 *     summary: Register a new discount
 *     tags: [Discount]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscountRequestDto'
 *     responses:
 *       201:
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscountResponseDto'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
    try {
        const dto: DiscountRequestDto = req.body;
        const email = req.user;
        if (!email) throw new Error('Invalid user');
        dto.userId = await getUserIdByEmail(email);
        const response: DiscountResponseDto = await registerDiscountControl(dto);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;
import {Request, Response, Router} from "express";
import {createGameControl} from "../controller/createGame.controller";

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Register game metadata.
 * components:
 *   schemas:
 *     Requirements:
 *       type: object
 *       properties:
 *         isMinimum:
 *           type: boolean
 *           required: true
 *         os:
 *           type: string
 *         cpu:
 *           type: string
 *         gpu:
 *           type: string
 *         ram:
 *           type: string
 *         storage:
 *           type: string
 *         network:
 *           type: string
 *     GameTag:
 *       type: object
 *       required:
 *         - tagId
 *         - priority
 *       properties:
 *         tagId:
 *           type: number
 *         priority:
 *           type: number
 *     BaseGameDto:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - thumbnailUrl
 *         - requirements
 *         - tags
 *         - isOrigin
 *       properties:
 *         title:
 *           type: string
 *         userId:
 *           type: number
 *         price:
 *           type: number
 *         thumbnailUrl:
 *           type: string
 *         description:
 *           type: string
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *         requirements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Requirements'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GameTag'
 *         isOrigin:
 *           type: boolean
 *     CreateGameDto:
 *       oneOf:
 *         - allOf:
 *           - $ref: '#/components/schemas/BaseGameDto'
 *           - type: object
 *             properties:
 *               isOrigin:
 *                 type: boolean
 *                 enum: [true]
 *         - allOf:
 *           - $ref: '#/components/schemas/BaseGameDto'
 *           - type: object
 *             properties:
 *               isOrigin:
 *                 type: boolean
 *                 enum: [false]
 *               originGameIds:
 *                 type: array
 *                 items:
 *                   type: number
 *             required:
 *               - originGameIds
 */
const router: Router = Router();

/**
 * @swagger
 * /api/protected/create/game:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGameDto'
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/game', async (req: Request, res: Response) => {
    try {
        await createGameControl(req);
        res.status(201).json({message: "Game created"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
});

export default router;
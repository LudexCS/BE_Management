import {Request, Response, Router} from "express";
import {createGameControl} from "../controller/create.controller";
import multer from "multer";
import {CreateGameDto} from "../dto/createGame.dto";

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
 *         description:
 *           type: string
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

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/protected/game/create:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               json:
 *                  type: string
 *                  format: application/json
 *                  description: JSON string of CreateGameDto
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail file
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: Image files
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gameId:
 *                   type: integer
 *                   description: ID of the newly created game
 *                   example: 3
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
router.post('/create', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images' }
]), async (req: Request, res: Response) => {
    try {
        // Expect game data as JSON string under the 'json' field
        const parsedBody = JSON.parse(req.body.json) as CreateGameDto;

        // Inject file info into parsedBody
        const thumbnailFile = (req.files as any)?.['thumbnail']?.[0];
        const imageFiles = (req.files as any)?.['images'] || [];

        parsedBody.thumbnailUrl = {
            path: thumbnailFile.path,
            mimetype: thumbnailFile.mimetype
        };
        parsedBody.imageUrls = imageFiles.map((file: Express.Multer.File) => ({
            path: file.path,
            mimetype: file.mimetype
        }));

        const email = req.user as string;
        const gameId = await createGameControl(parsedBody, email);
        res.status(201).json({ gameId });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;
import { Request, Response, Router } from "express";
import {CreateGameDto} from "../dto/createGame.dto"
import sharp from "sharp";
import fs from "fs/promises";
import multer from "multer";
import {updateGameDataControl, updateResourceControl} from "../controller/gameEdit.controller";
import {CreateResourceDto} from "../dto/createResource.dto";


const upload = multer({ dest: "uploads/" });


/**
 * @swagger
 * components:
 *   schemas:
 *     ImageInfo:
 *       type: object
 *       required:
 *         - path
 *         - mimetype
 *       properties:
 *         path:
 *           type: string
 *           description: Local file path before S3 upload
 *         mimetype:
 *           type: string
 *           example: image/webp

 *     GameRequirement:
 *       type: object
 *       required:
 *         - isMinimum
 *       properties:
 *         isMinimum:
 *           type: boolean
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
 *         titleKo:
 *           type: string
 *         userId:
 *           type: number
 *         price:
 *           type: number
 *         thumbnailUrl:
 *           $ref: '#/components/schemas/ImageInfo'
 *         description:
 *           type: string
 *         imageUrls:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ImageInfo'
 *         requirements:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GameRequirement'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/GameTag'
 *         isOrigin:
 *           type: boolean

 *     CreateGameDto:
 *       oneOf:
 *         - allOf:
 *             - $ref: '#/components/schemas/BaseGameDto'
 *             - type: object
 *               properties:
 *                 isOrigin:
 *                   type: boolean
 *                   enum: [true]
 *         - allOf:
 *             - $ref: '#/components/schemas/BaseGameDto'
 *             - type: object
 *               required:
 *                 - originGameIds
 *               properties:
 *                 isOrigin:
 *                   type: boolean
 *                   enum: [false]
 *                 originGameIds:
 *                   type: array
 *                   items:
 *                     type: number

 *     CreateResourceDto:
 *       type: object
 *       required:
 *         - gameId
 *         - sellerRatio
 *         - creatorRatio
 *         - allowDerivation
 *       properties:
 *         gameId:
 *           type: number
 *         userId:
 *           type: number
 *         sellerRatio:
 *           type: number
 *           description: Seller’s revenue share (0–100)
 *         creatorRatio:
 *           type: number
 *           description: Original creator’s revenue share (0–100)
 *         allowDerivation:
 *           type: boolean
 *           description: Whether derivative works are allowed
 *         additionalCondition:
 *           type: string
 *           description: Extra licensing remarks or legal terms
 *         description:
 *           type: string
 *         imageUrls:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ImageInfo'
 */
const router: Router = Router();

/**
 * @swagger
 * /api/protected/patch/game:
 *   patch:
 *     summary: Update an existing game
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
 *               gameId:
 *                 type: string
 *                 description: ID of the game to update
 *               json:
 *                 type: string
 *                 format: application/json
 *                 description: JSON string of CreateGameDto
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image file (optional)
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files (optional)
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.patch('/game', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images' }
]), async (req: Request, res: Response) => {
    try {
        const parsedBody = JSON.parse(req.body.json) as CreateGameDto;
        const gameId = req.body.gameId;

        const thumbnailFile = (req.files as any)?.['thumbnail']?.[0];
        const imageFiles = (req.files as any)?.['images'] || [];

        if (thumbnailFile) {
            const webpPath = thumbnailFile.path + ".webp";
            await sharp(thumbnailFile.path)
                .resize(640, 480, { fit: "inside" })
                .webp({ quality: 80 })
                .toFile(webpPath);
            await fs.unlink(thumbnailFile.path);
            parsedBody.thumbnailUrl = { path: webpPath, mimetype: "image/webp" };
        }

        parsedBody.imageUrls = await Promise.all(
            imageFiles.map(async (file: Express.Multer.File) => {
                const webpPath = file.path + ".webp";
                await sharp(file.path)
                    .resize(1280, 720, { fit: "inside" })
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                await fs.unlink(file.path);
                return { path: webpPath, mimetype: "image/webp" };
            })
        );

        const email = req.user as string;
        await updateGameDataControl(parsedBody, email, gameId);
        res.status(200).json({ message: "Game Data updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Update failed" });
    }
});


/**
 * @swagger
 * /api/protected/patch/resource:
 *   patch:
 *     summary: Update an existing resource
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resourceId:
 *                 type: string
 *                 description: ID of the resource to update
 *               json:
 *                 type: string
 *                 format: application/json
 *                 description: JSON string of CreateResourceDto
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files (optional)
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.patch('/resource', upload.fields([
    { name: 'images' }
]), async (req: Request, res: Response) => {
    try {
        const parsedBody = JSON.parse(req.body.json) as CreateResourceDto;

        const imageFiles = (req.files as any)?.['images'] || [];

        parsedBody.imageUrls = await Promise.all(
            imageFiles.map(async (file: Express.Multer.File) => {
                const webpPath = file.path + ".webp";
                await sharp(file.path)
                    .resize(1280, 720, { fit: "inside" })
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                await fs.unlink(file.path);
                return {
                    path: webpPath,
                    mimetype: "image/webp"
                };
            })
        );

        const email = req.user as string;
        await updateResourceControl(parsedBody, email);
        res.status(200).json({ message: "Resource Data updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error instanceof Error ? error.message : "Update failed" });
    }
});

export default router;
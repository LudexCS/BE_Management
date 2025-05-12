import {Request, Response, Router} from "express";
import multer from "multer";
import {CreateResourceDto} from "../dto/createResource.dto";
import {createResourceControl} from "../controller/create.controller";
import sharp from "sharp";
import fs from "fs/promises";

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Register downloadable resources with usage types and licenses.
 * components:
 *   schemas:
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
 *           description: ID of the game this resource is linked to
 *         userId:
 *           type: number
 *           description: Optional user ID; defaults to the authenticated user
 *         sellerRatio:
 *           type: number
 *           description: Revenue share ratio for the seller (0~100)
 *         creatorRatio:
 *           type: number
 *           description: Revenue share ratio for the original creator (0~100)
 *         allowDerivation:
 *           type: boolean
 *           description: Whether to allow derivative works
 *         additionalCondition:
 *           type: string
 *           description: Extra licensing conditions or remarks
 *         description:
 *           type: string
 *           description: Textual description of the resource
 */
const router: Router = Router();

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/protected/resource/create:
 *   post:
 *     summary: Register a new resource
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
 *               json:
 *                  type: string
 *                  format: application/json
 *                  description: JSON string of CreateResourceDto
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: Image files
 *     responses:
 *       201:
 *         description: Resource registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resourceId:
 *                   type: integer
 *                   description: ID of the newly registered resource
 *                   example: 42
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
    { name: 'images' }
]), async (req: Request, res: Response) => {
    try {
        // Expect game data as JSON string under the 'json' field
        const parsedBody = JSON.parse(req.body.json) as CreateResourceDto;

        // Inject file info into parsedBody
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
        const resourceId = await createResourceControl(parsedBody, email);
        res.status(201).json({ resourceId });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

export default router;

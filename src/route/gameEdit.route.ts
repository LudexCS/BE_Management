import { Request, Response, Router } from "express";
import {CreateGameDto} from "../dto/createGame.dto"
import sharp from "sharp";
import fs from "fs/promises";
import multer from "multer";
import {updateGameDataControl, updateResourceControl} from "../controller/gameEdit.controller";
import {CreateResourceDto} from "../dto/createResource.dto";


const upload = multer({ dest: "uploads/" });

const router: Router = Router();


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
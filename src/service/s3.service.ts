import { S3 } from "../config/s3.config";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import {GameImageUrl} from "../entity/gameImageUrl.entity";

export const uploadToS3 = async (gameImageUrl: GameImageUrl): Promise<string> => {
    const response = await fetch(gameImageUrl.url);
    const buffer = await response.arrayBuffer();
    const key = `games/${gameImageUrl.gameId}/images/${uuidv4()}${gameImageUrl.url.substring(gameImageUrl.url.lastIndexOf('.'))}`;

    const contentType = response.headers.get('content-type') ?? 'application/octet-stream';

    await S3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: contentType
    }));

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
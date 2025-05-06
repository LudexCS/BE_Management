import { S3 } from "../config/s3.config";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';
import { readFile } from 'fs/promises';

export const uploadGameImageToS3 = async (image: {path: string; mimetype: string}, gameId: number): Promise<string> => {
    const buffer = await readFile(image.path);
    const key = `games/${gameId}/images/${uuidv4()}${image.path.substring(image.path.lastIndexOf('.'))}`;

    await S3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: image.mimetype
    }));

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export const uploadResourceImageToS3 = async ( image: { path: string; mimetype: string }, resourceId: number): Promise<string> => {
    const buffer = await readFile(image.path);
    const key = `resources/${resourceId}/images/${uuidv4()}${image.path.substring(image.path.lastIndexOf('.'))}`;

    await S3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: image.mimetype
    }));

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
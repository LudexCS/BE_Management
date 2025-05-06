import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: "ap-northeast-2", // 예: 서울 리전
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

export const getPresignedUrl = async (key: string, type: "get" | "put" = "get", expiresInSec = 60): Promise<string> => {
    const command =
        type === "get"
            ? new GetObjectCommand({ Bucket: "your-bucket-name", Key: key })
            : new PutObjectCommand({ Bucket: "your-bucket-name", Key: key });

    const url = await getSignedUrl(s3, command, { expiresIn: expiresInSec });
    return url;
};
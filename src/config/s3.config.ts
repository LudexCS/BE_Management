import {S3Client} from "@aws-sdk/client-s3";

export const S3 = new S3Client({
    region: process.env.AWS_REGION
    // EC2에 IAM 역할이 부여되어 있다면 credentials는 생략 가능
});
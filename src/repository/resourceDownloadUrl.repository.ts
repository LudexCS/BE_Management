import {ResourceDownloadUrl} from "../entity/resourceDownloadUrl.entity";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";
import { getPresignedUrl } from "../service/s3.service";

const resourceDownloadUrlRepo: Repository<ResourceDownloadUrl> = AppDataSource.getRepository(ResourceDownloadUrl);

export const findResourceDownloadUrlByResourceId = async (resourceId: number) => {
    const downloadUrls = await resourceDownloadUrlRepo.find({
        where: { resourceId }
    });
    const result = await Promise.all(
        downloadUrls.map(downloadUrl => getPresignedUrl(downloadUrl.key))
    );
    return await result;
}
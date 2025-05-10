import {ResourceDownloadUrl} from "../entity/resourceImageUrl.entity";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";
import { getPresignedUrl } from "../service/s3.service";

const resourceDownloadUrlRepo: Repository<ResourceDownloadUrl> = AppDataSource.getRepository(ResourceDownloadUrl);

export const findResourceDownloadUrlByResourceId = async (resourceId: number) => {
    const downloadUrls = resourceDownloadUrlRepo.find({
        where: { resourceId}
    });
    const result = await Promise.all(
        downloadUrls.map(downloadUrl => getPresignedUrl(downloadUrl.url))
    );
    return await result;
}
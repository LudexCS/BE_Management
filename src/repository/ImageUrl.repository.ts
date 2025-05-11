import {Repository} from "typeorm";
import {ImageUrl} from "../entity/ImageUrl.entity";
import AppDataSource from "../config/mysql.config";

const ImageUrlRepo: Repository<ImageUrl> = AppDataSource.getRepository(ImageUrl);


export const findImageURLwithGameId = async(gameId: number): Promise<string[]> =>{
    try{
        const imageRows = await ImageUrlRepo.find({
            select: [ 'url' ],
            where: { gameId: gameId },
        });

        const imageURLs = imageRows.map(img => img.url);
        return imageURLs;
    } catch(err){
        throw err;
    }

}

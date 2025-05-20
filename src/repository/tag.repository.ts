import {Tag} from "../entity/tag.entity";
import AppDataSource from "../config/mysql.config";
import {Repository} from "typeorm";

const tagRepo: Repository<Tag> = AppDataSource.getRepository(Tag);

export async function saveTag(tag: Tag): Promise<number> {
    try {
        return (await tagRepo.save(tag)).id;
    } catch (error) {
        console.error('Failed to save tag:', error);
        throw new Error('Failed to save tag to database');
    }
}
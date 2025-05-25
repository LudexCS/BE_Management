import {GameRequirementDto} from "../dto/gameRequirement.dto";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";
import {GameRequirement} from "../entity/gameRequirement.entity";

const gameRequirementRepo: Repository<GameRequirement> = AppDataSource.getRepository(GameRequirement);

export const saveGameRequirement = async (gameRequirement: GameRequirement) => {
    try {
        return await gameRequirementRepo.save(gameRequirement);
    } catch (error) {
        console.error('Failed to save game requirement:', error);
        throw new Error('Failed to save game requirement to database');
    }
}

export const findGameRequirementWithGameId = async (gameId: number): Promise<GameRequirementDto[]> => {
    const rows = await gameRequirementRepo.find({
        select: ['isMinimum', 'os', 'cpu', 'gpu', 'ram', 'storage', 'network'],
        where: { gameId: gameId },
    });


    const requirements: GameRequirementDto[] = rows.map(row => ({
        isMinimum: row.isMinimum,
        os: row.os ?? undefined,
        cpu: row.cpu ?? undefined,
        gpu: row.gpu ?? undefined,
        ram: row.ram ?? undefined,
        storage: row.storage ?? undefined,
        network: row.network ?? undefined
    }));
    return requirements;
};

export const deleteGameRequirementsByGameId = async (gameId: number) => {
    await gameRequirementRepo.delete({ gameId });
};
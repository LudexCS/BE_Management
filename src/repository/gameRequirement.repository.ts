import {GameRequirementDto} from "../dto/gameRequirement.dto";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";
import {GameRequirement} from "../entity/gameRequirement.entity";

const gameRequirementRepo: Repository<GameRequirement> = AppDataSource.getRepository(GameRequirement);


export const findGameRequirementWithGameId = async (gameId: number): Promise<GameRequirementDto[]> => {
    const rows = await gameRequirementRepo.find({
        select: ['is_minimum', 'os', 'cpu', 'gpu', 'ram', 'storage', 'network'],
        where: { game_id: gameId },
    });


    const requirements: GameRequirementDto[] = rows.map(row => ({
        is_minimum: row.is_minimum,
        os: row.os ?? undefined,
        cpu: row.cpu ?? undefined,
        gpu: row.gpu ?? undefined,
        ram: row.ram ?? undefined,
        storage: row.storage ?? undefined,
        network: row.network ?? undefined
    }));
    return requirements;
};

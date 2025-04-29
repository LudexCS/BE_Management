import {GameRequirementDto} from "../dto/gameRequirement.dto";
import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";
import {GameRequirement} from "../entity/gameRequirement.entity";

const gameRequirementRepo: Repository<GameRequirement> = AppDataSource.getRepository(GameRequirement);


export const findGameRequirementWithGameId = async (gameId: number): Promise<GameRequirementDto[]> => {
    const rows = await gameRequirementRepo.find({
        select: ['type', 'spec_min_value', 'spec_rec_value'],
        where: { game_id: gameId },
    });


    const requirements: GameRequirementDto[] = rows.map(row => ({
        type: row.type,
        spec_min_value: row.spec_min_value,
        spec_rec_value: row.spec_rec_value,
    }));
    return requirements;
};

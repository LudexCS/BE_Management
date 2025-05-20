import AppDataSource from '../config/mysql.config';
import { Account } from '../entity/account.entity';
import { Game } from '../entity/game.entity';
import { GameRequirement } from '../entity/gameRequirement.entity';
import { GameTag } from '../entity/gameTag.entity';
import { GameImageUrl } from '../entity/gameImageUrl.entity';
import { Resource } from '../entity/resource.entity';
import { ResourceImageUrl } from '../entity/resourceImageUrl.entity';
import { GameDataDto } from '../dto/gameEdit.dto';

export async function updateGameData(email: string, gameId: number, dto: GameDataDto) {
    await AppDataSource.transaction(async (manager) => {
        const user = await manager.findOne(Account, { where: { email } });
        if (!user) throw new Error('유저를 찾을 수 없습니다');

        const game = await manager.findOne(Game, { where: { id: gameId } });
        if (!game) throw new Error('게임을 찾을 수 없습니다');
        if (game.userId !== user.id) throw new Error('게임 수정 권한이 없습니다');

        game.title = dto.title;
        game.price = dto.price;
        game.description = dto.description ?? '';
        await manager.save(game);

        await manager.delete(GameRequirement, { gameId });
        await manager.delete(GameTag, { gameId });
        await manager.delete(GameImageUrl, { gameId });

        const existingResource = await manager.findOne(Resource, { where: { gameId } });
        const resourceId = existingResource?.id;
        if (resourceId) {
            await manager.delete(ResourceImageUrl, { resourceId });
        }

        const requirements = dto.requirements.map((r) =>
            manager.create(GameRequirement, { ...r, gameId })
        );
        await manager.save(requirements);

        const tags = dto.tags.map((t) =>
            manager.create(GameTag, { gameId, tagId: t.tagId, priority: t.priority })
        );
        await manager.save(tags);


        let resource = existingResource;
        if (resource) {
            resource.sellerRatio = dto.resource.sellerRatio;
            resource.creatorRatio = dto.resource.creatorRatio;
            resource.allowDerivation = dto.resource.allowDerivation;
            resource.additionalCondition = dto.resource.additionalCondition ?? null;
            resource.description = dto.resource.description ?? null;
            await manager.save(resource);
        } else {
            resource = manager.create(Resource, {
                gameId,
                userId: user.id,
                sellerRatio: dto.resource.sellerRatio,
                creatorRatio: dto.resource.creatorRatio,
                allowDerivation: dto.resource.allowDerivation,
                additionalCondition: dto.resource.additionalCondition ?? null,
                description: dto.resource.description ?? null
            });
            await manager.save(resource);
        }

        if (dto.resource.images && dto.resource.images.length > 0) {
            const resourceImages = dto.resource.images.map((img) =>
                manager.create(ResourceImageUrl, {
                    resourceId: resource.id,
                    url: img.url,
                    key: img.key
                })
            );
            await manager.save(resourceImages);
        }
    });
}
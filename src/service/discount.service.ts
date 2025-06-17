import {
    DiscountRequestDto,
    DiscountResponseDto,
    toDiscountEntity,
    toResponseDto
} from "../dto/discount.dto";
import {existsDiscount, saveDiscount} from "../repository/discount.repository";
import {adminFindGameDetailWithGameId} from "../repository/game.repository";
import {ReductionRequestDto, toDiscountEntityFromReductionDto} from "../dto/reduction.dto";
import {findGameIdByResourceId, findUserId} from "../repository/resource.repository";
import {findVariantGameIdByOriginGameId} from "../repository/originGame.repository";

function calculateDiscountRate(price: string, discountPrice: string) {
    const rate = (Number(price) - Number(discountPrice)) / Number(price);
    const roundedRate = Math.round(rate * 100) / 100;
    return roundedRate;
}

function calculateDiscountPrice(price: string, discountRate: number) {
    const discountPrice = Number(price) * (1 - discountRate);
    return discountPrice.toFixed(2);
}

export async function registerDiscount(discountDto: DiscountRequestDto): Promise<DiscountResponseDto> {
    const game = await adminFindGameDetailWithGameId(discountDto.gameId);

    console.log("discount user id : ", discountDto.userId, " game user id : ", game.userId);
    if (Number(discountDto.userId) !== Number(game.userId)) {
        throw new Error('Only the creator of the game can set a discount.');
    }

    if (await existsDiscount(discountDto.gameId)) {
        throw new Error('이미 등록된 할인이 존재합니다.');
    }

    discountDto.discountRate = calculateDiscountRate(game.price, discountDto.discountPrice);

    if (discountDto.discountRate < 0 || discountDto.discountRate > 100) {
        throw new Error('Invalid discount rate');
    }
    if (Number(discountDto.discountPrice) < 0) {
        throw new Error('Invalid discount price');
    }
    if (discountDto.startsAt > discountDto.endsAt) {
        throw new Error('Invalid discount time');
    }

    let entity = toDiscountEntity(discountDto);
    entity = await saveDiscount(entity);
    return toResponseDto(entity);
}

export async function registerReduction(reductionDto: ReductionRequestDto): Promise<DiscountResponseDto[]> {
    if (Number(await findUserId(reductionDto.resourceId)) !== Number(reductionDto.userId)) {
        throw new Error('Only the creator of the resource can set a reduction.');
    }

    const gameId = await findGameIdByResourceId(reductionDto.resourceId);
    const variantGameIds = await findVariantGameIdByOriginGameId(gameId);
    const variantGames = await Promise.all(variantGameIds.map(adminFindGameDetailWithGameId));

    if (reductionDto.discountRate < 0 || reductionDto.discountRate > 100) {
        throw new Error('Invalid discount rate');
    }
    if (reductionDto.startsAt > reductionDto.endsAt) {
        throw new Error('Invalid discount time');
    }

    return await Promise.all(variantGames.map(async game => {
        const discountPrice = calculateDiscountPrice(game.price, reductionDto.discountRate);
        let entity = toDiscountEntityFromReductionDto(reductionDto, game.id, discountPrice);
        entity = await saveDiscount(entity);
        return toResponseDto(entity);
    }))
}
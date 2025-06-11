import {
    DiscountRequestDto,
    DiscountResponseDto,
    toDiscountEntity,
    toResponseDto
} from "../dto/discount.dto";
import {saveDiscount} from "../repository/discount.repository";
import {adminFindGameDetailWithGameId} from "../repository/game.repository";

function calculateDiscountRate(price: string, discountPrice: string) {
    const rate = (Number(price) - Number(discountPrice)) / Number(price);
    const roundedRate = Math.round(rate * 100) / 100;
    return roundedRate;
}

export async function registerDiscount(discountDto: DiscountRequestDto): Promise<DiscountResponseDto> {
    const game = await adminFindGameDetailWithGameId(discountDto.gameId);

    if (discountDto.userId !== game.userId) {
        throw new Error('Only the creator of the game can set a discount.');
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
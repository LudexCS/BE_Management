import {Discount} from "../entity/discount.entity";

export interface ReductionRequestDto {
    resourceId: number;
    userId: number;
    discountRate: number;
    startsAt: Date;
    endsAt: Date;
}

export function toDiscountEntityFromReductionDto(dto: ReductionRequestDto, gameId: number, discountPrice: string): Discount {
    const entity = new Discount();
    entity.gameId = gameId;
    entity.userId = dto.userId;
    entity.discountRate = dto.discountRate;
    entity.discountPrice = discountPrice;
    entity.startsAt = dto.startsAt;
    entity.endsAt = dto.endsAt;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();
    return entity;
}
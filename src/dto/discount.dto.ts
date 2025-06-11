import {Discount} from "../entity/discount.entity";

export interface DiscountRequestDto {
    gameId: number;
    userId: number;
    discountRate: number;
    discountPrice: string;
    startsAt: Date;
    endsAt: Date;
}

export interface DiscountResponseDto {
    id: number;
    gameId: number;
    userId: number;
    discountRate: number;
    discountPrice: string;
    startsAt: Date;
    endsAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export function toDiscountEntity(dto: DiscountRequestDto): Discount {
    const entity = new Discount();
    entity.gameId = dto.gameId;
    entity.userId = dto.userId;
    entity.discountRate = dto.discountRate;
    entity.discountPrice = dto.discountPrice;
    entity.startsAt = dto.startsAt;
    entity.endsAt = dto.endsAt;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();
    return entity;
}

export function toResponseDto(entity: Discount): DiscountResponseDto {
    return {
        id: entity.id,
        gameId: entity.gameId,
        userId: entity.userId !== null ? entity.userId : 0,
        discountRate: entity.discountRate,
        discountPrice: entity.discountPrice,
        startsAt: entity.startsAt,
        endsAt: entity.endsAt,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
    };
}
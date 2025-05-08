import {GameRequirementDto} from "./gameRequirement.dto";

export interface GameDetailDto {
    id: number;
    title: string;
    userId: number;
    price: number;
    thumnailUrl: string;
    description: string;
    registeredAt: Date;
    updatedAt: Date;
    tags: string[];            // 태그 문자열 배열
    imageUrls: string[];       // 이미지 URL 문자열 배열
    requirements: GameRequirementDto[]; // 시스템 요구사항 배열
}
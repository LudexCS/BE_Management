import {GameRequirementDto} from "./gameRequirement.dto";

export interface GameDetailDto {
    id: number;
    title: string;
    titleKo: string;
    userId: number;
    nickName: string;
    price: string;
    discountRate: string | null;
    discountPrice: string | null;
    thumbnailUrl: string;
    description: string;
    downloadTimes: number;
    itemId: string;
    registeredAt: Date;
    updatedAt: Date;
    tags: string[];            // 태그 문자열 배열
    imageUrls: string[];       // 이미지 URL 문자열 배열
    requirements: GameRequirementDto[]; // 시스템 요구사항 배열
    originId: number | null;
}
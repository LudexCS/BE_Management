export class ResourceDetailDto {
    id: number;
    gameId: number;
    userId: number;
    sellerRatio: number;
    creatorRatio: number;
    allowDerivation: boolean;
    additionalCondition: string | null;
    description: string | null;
    downloadTimes: number;
    sharerId: bigint;
    registeredAt: Date;
    updatedAt: Date;
    imageUrls: string[];
    downloadUrls: string[];
}
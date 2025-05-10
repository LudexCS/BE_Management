export interface GameTempDetailDto {
    id: number;
    title: string;
    userId: number;
    price: number;
    thumbnailUrl: string;
    description: string;
    downloadTimes: number;
    itemId: bigint;
    registeredAt: Date;
    updatedAt: Date;
}
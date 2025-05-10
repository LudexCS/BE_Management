export interface GameTempDetailDto {
    id: number;
    title: string;
    userId: number;
    userName: string;
    price: number;
    thumbnailUrl: string;
    description: string;
    downloadTimes: number;
    itemId: bigint;
    registeredAt: Date;
    updatedAt: Date;
}
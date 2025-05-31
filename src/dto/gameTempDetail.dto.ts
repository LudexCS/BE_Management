export interface GameTempDetailDto {
    id: number;
    title: string;
    titleKo: string;
    userId: number;
    nickName: string;
    price: number;
    thumbnailUrl: string;
    description: string;
    downloadTimes: number;
    itemId: string;
    registeredAt: Date;
    updatedAt: Date;
    originId: number | null;
}
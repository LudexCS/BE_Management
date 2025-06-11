export class GamesListDto {
    gameId: number;
    title: string;
    titleKo: string;
    thumbnailUrl: string;
    itemId: string;
    price: string;
    discountRate: string;
    discountPrice: string;
    description: string;
    downloadTimes: number;
    tags: string[];
    isBlocked?: boolean;
}
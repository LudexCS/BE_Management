export interface RequirementDto {
    isMinimum: boolean;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
}

export interface GameTradeDto {
    gameId: number;
    userId: number;
    title: string;
    price: string;
    discountRate: string | null;
    discountPrice: string | null;
    description: string;
    thumbnailUrl: string;
    itemId: string;
    purchaseId: string;
    requirement: RequirementDto[];
    downloadTimes?: number;
}

export interface ResourceTradeDto {
    resourceId: number;
    userId: number;
    description: string;
    sharerId: string;
    sellerRatio: string;
    createrRatio: string;
    allowDerivation: boolean;
    downloadTimes: number;
    imageUrl: string | null;
    gameId: number;
    title: string;
}



export interface TradeInfoRawDto {
    id: number;
    userId: number;
    title: string;
    price: string;
    discountRate: string | null;
    discountPrice: string | null;
    description: string;
    thumbnailUrl: string | null;
    itemId: string;
    isMinimum: boolean | null;
    os: string | null;
    cpu: string | null;
    gpu: string | null;
    ram: string | null;
    storage: string | null;
    purchaseId: string;
    downloadTimes: number;
}

export interface TradeHistoryDto {
    purchased: {
        games: GameTradeDto[];
        resources: ResourceTradeDto[];
    };
    sold: {
        games: GameTradeDto[];
        resources: ResourceTradeDto[];
    };
}
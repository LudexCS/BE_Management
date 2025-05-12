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
    description: string;
    thumbnailUrl: string;
    itemId: bigint;
    requirement: RequirementDto[];
}

export interface ResourceTradeDto {
    resourceId: number;
    userId: number;
    description: string;
    sharerId: number;
    sellerRatio: string;
    createrRatio: string
    imageUrl: string
    gameId: number;
}



export interface TradeInfoRawDto {
    id: number;
    userId: number;
    title: string;
    price: string;
    description: string;
    thumbnailUrl: string | null;
    itemId: bigint;
    isMinimum: boolean | null;
    os: string | null;
    cpu: string | null;
    gpu: string | null;
    ram: string | null;
    storage: string | null;
}

export interface TradeHistoryDto {
    purchased: {
        games: GameTradeDto[];
        resources: ResourceTradeDto[];
    };
    sold: {
        games: GameTradeDto[];
    };
}
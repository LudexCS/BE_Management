export interface RequirementDto {
    is_minimum: boolean;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
}

export interface GameTradeDto {
    game_id: number;
    user_id: number;
    title: string;
    price: string;
    description: string;
    thumnail_url: string;
    requirement: RequirementDto[];
}

export interface ResourceTradeDto {
    resource_id: number;
    user_id: number;
    description: string;
    seller_ratio: string;
    creater_ratio: string
    image_url: string
    game_id: number;
}



export interface TradeInfoRawDto {
    id: number;
    user_id: number;
    title: string;
    price: string;
    description: string;
    thumnail_url: string;
    is_minimum: boolean | null;
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
export interface GameRequirementDto {
    isMinimum: boolean;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    network?: string;
}

export interface GameTagDto {
    tagId: number;
    priority: number;
}

export interface GameResourceDto {
    sellerRatio: number;
    creatorRatio: number;
    allowDerivation: boolean;
    additionalCondition?: string;
    description?: string;
}

export interface ResourceImageDto {
    url: string;
    key: string;
}

export interface GameResourceDto {
    sellerRatio: number;
    creatorRatio: number;
    allowDerivation: boolean;
    additionalCondition?: string;
    description?: string;
    images?: ResourceImageDto[];
}

export interface GameDataDto {
    title: string;
    price: number;
    description?: string;
    requirements: GameRequirementDto[];
    tags: GameTagDto[];
    resource: GameResourceDto;
}
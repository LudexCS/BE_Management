interface BaseGameDto {
    title: string;
    userId?: number;
    price: number;
    thumbnailUrl: string;
    description?: string;
    imageUrls: string[];

    requirements: {
        isMinimum: boolean;
        os?: string;
        cpu?: string;
        gpu?: string;
        ram?: string;
        storage?: string;
        network?: string;
    }[];

    tags: {
        tagId: number;
        priority: number;
    }[];

    isOrigin: boolean;
}

export type CreateGameDto =
    | (BaseGameDto & { isOrigin: true; originGameIds?: undefined })
    | (BaseGameDto & { isOrigin: false; originGameIds: number[] });
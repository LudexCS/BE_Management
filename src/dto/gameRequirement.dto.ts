export interface GameRequirementDto {
    is_minimum: boolean;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    network?: string;
}
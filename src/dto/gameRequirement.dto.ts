export interface GameRequirementDto {
    isMinimum: boolean;
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    network?: string;
}
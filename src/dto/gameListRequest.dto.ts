import { IsInt, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GameListRequestDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number;
}
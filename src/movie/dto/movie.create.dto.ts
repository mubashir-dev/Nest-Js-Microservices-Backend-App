import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsMongoId,
   IsBoolean,
} from 'class-validator';

export class MovieCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @Type(() => String)
    readonly title: string;

    @IsString()
    @MaxLength(300)
    @Type(() => String)
    readonly description?: string;

    @IsBoolean()
    @MaxLength(300)
    @Type(() => String)
    readonly isActive?: boolean;

    @IsMongoId()
    @IsNotEmpty()
    readonly category: string;
}

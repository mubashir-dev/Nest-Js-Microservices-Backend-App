import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsOptional,
} from 'class-validator';

export class CategoryCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @Type(() => String)
    readonly title: string;

    @IsOptional()
    @MaxLength(300)
    @Type(()=> String)
    readonly description?: string;

    @IsOptional()
    @MaxLength(300)
    readonly isActive?: boolean;


}

import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsMongoId,
   IsBoolean,
} from 'class-validator';
import { CategoryApiEntity } from '../../category/schema/category.api.schema';

export class ProductCreateDto {
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

    @IsNotEmpty()
    @IsMongoId()
    readonly category: CategoryApiEntity;
}

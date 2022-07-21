import { Type } from 'class-transformer';
import { CategoryEntity } from '../../movieCategory/schema/category.schema';

export class MovieListSerialization {
    @Type(() => String)
    readonly _id: string;
    readonly title: string;
    readonly description:string;
    readonly isActive: boolean;
    readonly category:CategoryEntity
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

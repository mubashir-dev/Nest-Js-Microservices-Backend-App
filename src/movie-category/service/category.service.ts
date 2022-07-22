import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
} from 'src/database/database.interface';
import { CategoryDocument, CategoryEntity } from '../schema/category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @DatabaseEntity(CategoryEntity.name)
        private readonly categoryModel: Model<CategoryDocument>,
    ) {
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions,
    ): Promise<CategoryDocument[]> {
        const categories = this.categoryModel.find(find);
        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            categories.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            categories.sort(options.sort);
        }

        return categories.lean();
    }

    async findOne<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions,
    ): Promise<T> {
        const category = this.categoryModel.findOne(find);
        return category.lean();
    }

}

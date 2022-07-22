import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import { DeleteResult } from 'mongodb';
import { CategoryDocument, CategoryEntity } from '../schema/category.schema';
import { CategoryCreateDto } from '../dto/category.create.dto';

@Injectable()
export class CategoryBulkService {
    constructor(
        @DatabaseEntity(CategoryEntity.name)
        private readonly categoryModel: Model<CategoryDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.categoryModel.deleteMany(find);
    }

    async createMany(data: CategoryCreateDto[]): Promise<CategoryDocument[]> {
        return this.categoryModel.insertMany(
            data.map(({ title, description}) => ({
                title,
                isActive: true,
                description,
            }))
        );
    }
}

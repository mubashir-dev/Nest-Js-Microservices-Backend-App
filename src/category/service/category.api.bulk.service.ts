import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import { DeleteResult } from 'mongodb';
import { CategoryApiDocument, CategoryApiEntity } from '../schema/category.api.schema';
import { CategoryApiCreateDto } from '../dto/category.api.create.dto';

@Injectable()
export class CategoryBulkService {
    constructor(
        @DatabaseEntity(CategoryApiEntity.name)
        private readonly categoryModel: Model<CategoryApiDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.categoryModel.deleteMany(find);
    }

    async createMany(data: CategoryApiCreateDto[]): Promise<CategoryApiDocument[]> {
        return this.categoryModel.insertMany(
            data.map(({ title, description}) => ({
                title,
                isActive: true,
                description,
            }))
        );
    }
}

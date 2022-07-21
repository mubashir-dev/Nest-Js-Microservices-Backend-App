import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import { DeleteResult } from 'mongodb';
import { ProductDocument, ProductEntity } from '../schema/product.schema';
import { ProductCreateDto } from '../dto/product.create.dto';


@Injectable()
export class ProductBulkService {
    constructor(
        @DatabaseEntity(ProductEntity.name)
        private readonly productModel: Model<ProductDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.productModel.deleteMany(find);
    }

    async createMany(data: ProductCreateDto[]): Promise<ProductDocument[]> {
        return this.productModel.insertMany(
            data.map(({ title, description, category }) => ({
               title,
                description,
                category,
                isActive:true
            }))
        );
    }
}

import { Module } from '@nestjs/common';
import { CategoryBulkService } from '../category/service/category.api.bulk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryApiDatabaseName, CategoryApiEntity, CategoryApiSchema } from '../category/schema/category.api.schema';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import { ProductDatabaseName, ProductEntity, ProductSchema } from './schema/product.schema';
import { ProductBulkService } from './service/product.builk.service';

@Module({
    controllers:[],
    providers: [ProductBulkService],
    exports: [ProductBulkService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: ProductEntity.name,
                    schema: ProductSchema,
                    collection: ProductDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],})
export class ProductModule {}

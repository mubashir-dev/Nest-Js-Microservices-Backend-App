import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import { CategoryApiDatabaseName, CategoryApiEntity, CategoryApiSchema } from './schema/category.api.schema';
import { CategoryBulkService } from './service/category.api.bulk.service';
import { CategoryService } from './service/category.service';

@Module({
    controllers:[],
    providers: [CategoryBulkService,CategoryService],
    exports: [CategoryBulkService,CategoryService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CategoryApiEntity.name,
                    schema: CategoryApiSchema,
                    collection: CategoryApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],})
export class CategoryModule {}

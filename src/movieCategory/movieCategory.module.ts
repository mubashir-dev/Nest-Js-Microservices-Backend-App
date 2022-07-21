import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import { CategoryDatabaseName, CategoryEntity, CategorySchema } from './schema/category.schema';
import { CategoryBulkService } from './service/category.bulkService';
import { CategoryService } from './service/category.service';

@Module({
    controllers:[],
    providers: [CategoryBulkService,CategoryService],
    exports: [CategoryBulkService,CategoryService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CategoryEntity.name,
                    schema: CategorySchema,
                    collection: CategoryDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],})
export class MovieCategoryModule {}

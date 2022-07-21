import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import { MovieDatabaseName, MovieEntity, MovieSchema } from './schema/movie.schema';
import { MovieBulkService } from './service/movie.builkService';
import { MovieController } from './controller/movie.controller';
import { MovieService } from './service/movie.service';
import { CategoryDatabaseName, CategoryEntity, CategorySchema } from '../movieCategory/schema/category.schema';

@Module({
    controllers:[MovieController],
    providers: [MovieBulkService,MovieService],
    exports: [MovieBulkService,MovieService],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: MovieEntity.name,
                    schema: MovieSchema,
                    collection: MovieDatabaseName,
                },
                {
                    name: CategoryEntity.name,
                    schema: CategorySchema,
                    collection: CategoryDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],})
export class MovieModule {}

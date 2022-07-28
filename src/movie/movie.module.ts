import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import { MovieDatabaseName, MovieEntity, MovieSchema } from './schema/movie.schema';
import { MovieBulkService } from './service/movie.builkService';
import { MovieController } from './controller/movie.controller';
import { MovieService } from './service/movie.service';
import { CategoryDatabaseName, CategoryEntity, CategorySchema } from '../movie-category/schema/category.schema';
import { UserMoviePreferenceService } from '../user-movie-preference/service/user-movie-preference.service';
import {
    UserMoviePreferenceDatabaseName,
    UserMoviePreferenceEntity,
    UserMoviePreferenceSchema,
} from '../user-movie-preference/schema/user-movie-preference.schema';
import { MovieRatingService } from '../movie-rating/service/movie-rating.service';
import {
    MovieRatingDatabaseName,
    MovieRatingEntity,
    MovieRatingSchema,
} from '../movie-rating/schema/movieRating.schema';

@Module({
    controllers:[MovieController],
    providers: [MovieBulkService,MovieService,UserMoviePreferenceService,MovieRatingService],
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
                {
                    name: UserMoviePreferenceEntity.name,
                    schema: UserMoviePreferenceSchema,
                    collection: UserMoviePreferenceDatabaseName,
                },
                {
                    name: MovieRatingEntity.name,
                    schema: MovieRatingSchema,
                    collection: MovieRatingDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class MovieModule {}

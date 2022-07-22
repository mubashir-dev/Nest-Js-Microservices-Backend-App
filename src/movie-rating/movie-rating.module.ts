import { Module } from '@nestjs/common';
import { MovieRatingController } from './controller/movie-rating.controller';
import { MovieRatingService } from './service/movie-rating.service';
import { MovieBulkService } from '../movie/service/movie.builkService';
import { MovieService } from '../movie/service/movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieDatabaseName, MovieEntity, MovieSchema } from '../movie/schema/movie.schema';
import { CategoryDatabaseName, CategoryEntity, CategorySchema } from '../movie-category/schema/category.schema';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import { MovieRatingDatabaseName, MovieRatingEntity, MovieRatingSchema } from './schema/movieRating.schema';
import { ConfigService } from '@nestjs/config';
import { AuthApiService } from '../auth/service/auth.api.service';
import { AuthApiDatabaseName, AuthApiEntity, AuthApiSchema } from '../auth/schema/auth.api.schema';

@Module({
  controllers: [MovieRatingController],
  providers: [MovieRatingService,AuthApiService],
  exports: [MovieRatingService],
  imports: [
    MongooseModule.forFeature(
        [
          {
            name: MovieRatingEntity.name,
            schema: MovieRatingSchema,
            collection: MovieRatingDatabaseName,
          },
          {
            name: AuthApiEntity.name,
            schema: AuthApiSchema,
            collection: AuthApiDatabaseName,
          },
        ],
        DATABASE_CONNECTION_NAME
    ),

  ],
})
export class MovieRatingModule {}

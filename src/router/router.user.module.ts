import { Module } from '@nestjs/common';
import { MovieRatingController } from 'src/movie-rating/controller/movie-rating.controller';
import { MovieRatingModule } from 'src/movie-rating/movie-rating.module';
import { MovieModule } from 'src/movie/movie.module';
import { MovieController } from '../movie/controller/movie.controller';
import { UserMoviePreferenceModule } from '../user-movie-preference/user-movie-preference.module';
import { UserMoviePreferenceController } from 'src/user-movie-preference/controller/user-movie-preference.controller';

@Module({
    controllers: [MovieController,MovieRatingController,UserMoviePreferenceController],
    providers: [],
    exports: [],
    imports: [MovieModule,MovieRatingModule,UserMoviePreferenceModule],
})
export class RouterUserModule {}

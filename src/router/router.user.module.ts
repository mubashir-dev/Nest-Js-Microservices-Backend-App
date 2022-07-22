import { Module } from '@nestjs/common';
import { MovieRatingController } from 'src/movie-rating/controller/movie-rating.controller';
import { MovieRatingModule } from 'src/movie-rating/movie-rating.module';
import { MovieModule } from 'src/movie/movie.module';
import { MovieController } from '../movie/controller/movie.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthApiService } from 'src/auth/service/auth.api.service';

@Module({
    controllers: [MovieController,MovieRatingController],
    providers: [],
    exports: [],
    imports: [MovieModule,MovieRatingModule,],
})
export class RouterUserModule {}

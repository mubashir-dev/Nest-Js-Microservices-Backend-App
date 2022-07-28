import { Controller, Get, Query } from '@nestjs/common';
import { PaginationService } from '../../pagination/service/pagination.service';
import { MovieService } from '../service/movie.service';
import { IResponsePaging } from '../../utils/response/response.interface';
import { MovieDocument } from '../schema/movie.schema';
import { MovieListDto } from '../dto/movie.list.dto';
import { MovieListSerialization } from '../serialization/movie.list.serialization';
import { AuthJwtGuard, User } from '../../auth/auth.decorator';
import { UserMoviePreferenceService } from 'src/user-movie-preference/service/user-movie-preference.service';
import { MovieRatingService } from '../../movie-rating/service/movie-rating.service';

@Controller({
    version: '1',
    path: 'movie',
})
export class MovieController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly movieService: MovieService,
        private readonly userMoviePreferenceService: UserMoviePreferenceService,
        private readonly movieRatingService: MovieRatingService,

    ) {}
    @Get('/list')
    @AuthJwtGuard()
    async list(
        @User()
            { _id }: Record<string, any>,
        @Query()
            {
                page,
                perPage,
                sort,
                search,
                availableSort,
                availableSearch,
            }: MovieListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {};
        if (search) {
            find['$or'] = [
                {
                    name: {
                        $regex: new RegExp(search),
                        $options: 'i',
                    },
                },
            ];
        }

        const movies: MovieDocument[] = await this.movieService.findAll(find, {
            skip: skip,
            limit: perPage,
            sort,
        });

        const totalData: number = await this.movieService.getTotal({});
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );
        const data: MovieListSerialization[] =
            await this.movieService.serializationList(movies);

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data,
        };
    }

    @AuthJwtGuard()
    @Get('/recommended')
    async recommended(
        @User()
            { _id }: Record<string, any>,
        @Query()
            {
                page,
                perPage,
                sort,
                search,
                availableSort,
                availableSearch,
            }: MovieListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {};
        if (search) {
            find['$or'] = [
                {
                    name: {
                        $regex: new RegExp(search),
                        $options: 'i',
                    },
                },
            ];
        }
        const userMoviePreferences = await this.userMoviePreferenceService.findUserMoviePreference(find,_id);
        const userRatedMovies = await this.movieRatingService.findUserReviewedMovies(_id);
        console.log('userRatedMovies',userRatedMovies);
        const movies: MovieDocument[] = await this.movieService.findRecommendedAll(find, {
            skip: skip,
            limit: perPage,
            sort,
        },userMoviePreferences,userRatedMovies);

        const totalData: number = await this.movieService.getTotal({});
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );
        const data: MovieListSerialization[] =
            await this.movieService.serializationList(movies);

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data,
        };
    }

}

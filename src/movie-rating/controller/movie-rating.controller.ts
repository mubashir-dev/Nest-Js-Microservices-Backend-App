import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { PaginationService } from '../../pagination/service/pagination.service';
import { MovieRatingService } from '../service/movie-rating.service';
import { Response } from '../../utils/response/response.decorator';
import { IResponse } from '../../utils/response/response.interface';
import { ENUM_STATUS_CODE_ERROR } from '../../utils/error/error.constant';
import { MovieRatingCreateDto } from '../dto/movieRating.create.dto';
import { AuthJwtGuard, User } from '../../auth/auth.decorator';

@Controller({
    version: '1',
    path: 'movie/rating',
})
export class MovieRatingController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly movieRatingService: MovieRatingService,
    ) {
    }

    @Response('movie.rating')
    @AuthJwtGuard()
    @Post('/create')
    async create(
        @User()
            { _id }: Record<string, any>,
        @Body()
            { movie, rating }: MovieRatingCreateDto,
    ): Promise<IResponse> {
        try {
            const create = await this.movieRatingService.create(_id,{
                movie,
                rating
            });

            return {
                _id: create._id != null ?create._id: null,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
            });
        }
    }

}

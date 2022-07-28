import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { PaginationService } from '../../pagination/service/pagination.service';
import { Response } from '../../utils/response/response.decorator';
import { IResponse } from '../../utils/response/response.interface';
import { ENUM_STATUS_CODE_ERROR } from '../../utils/error/error.constant';
import { AuthJwtGuard, User } from '../../auth/auth.decorator';
import { UserMoviePreferenceService } from '../service/user-movie-preference.service';
import { UserMoviePreferenceCreateDto } from '../dto/user-movie-preference.create.dto';

@Controller({
    version: '1',
    path: 'movie/preference',
})
export class UserMoviePreferenceController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly userMoviePreferenceService: UserMoviePreferenceService,
    ) {
    }

    @Response('movie.preference')
    @AuthJwtGuard()
    @Post('/create')
    async create(
        @User()
            { _id }: Record<string, any>,
        @Body()
            {category }: UserMoviePreferenceCreateDto,
    ): Promise<IResponse> {
        try {
            const create = await this.userMoviePreferenceService.create(_id,{
                category
            });

            return {
                _id: create._id,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_STATUS_CODE_ERROR.UNKNOWN_ERROR,
                message: 'http.serverError.internalServerError',
            });
        }
    }

}

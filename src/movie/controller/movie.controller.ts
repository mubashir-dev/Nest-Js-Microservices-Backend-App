import { Controller, Get, Query } from '@nestjs/common';
import { PaginationService } from '../../pagination/service/pagination.service';
import { MovieService } from '../service/movie.service';
import { ResponsePaging } from '../../utils/response/response.decorator';
import { IResponsePaging } from '../../utils/response/response.interface';
import { MovieDocument } from '../schema/movie.schema';
import { MovieListDto } from '../dto/movie.list.dto';
import { MovieListSerialization } from '../serialization/movie.list.serialization';
import { AuthJwtGuard } from '../../auth/auth.decorator';

@Controller({
    version: '1',
    path: 'movie',
})
export class MovieController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly movieService: MovieService,
    ) {}
    @Get('/list')
    @AuthJwtGuard()
    async list(
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

        const movies: MovieDocument[] = await this.movieService.findRecommendedAll(find, {
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

}

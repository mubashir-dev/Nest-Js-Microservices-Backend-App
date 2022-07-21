import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
} from 'src/database/database.interface';
import { MovieDocument, MovieEntity } from '../schema/movie.schema';
import { plainToInstance } from 'class-transformer';
import { MovieListSerialization } from '../serialization/movie.list.serialization';
import {  CategoryEntity,  } from '../../movieCategory/schema/category.schema';
import { RoleEntity } from '../../role/schema/role.schema';

@Injectable()
export class MovieService {
    constructor(
        @DatabaseEntity(MovieEntity.name)
        private readonly movieModel: Model<MovieDocument>,
    ) {
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions,
    ): Promise<MovieDocument[]> {
        const movies = this.movieModel.find(find).populate({
            path: 'category',
            model: CategoryEntity.name,
        });
        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            movies.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            movies.sort(options.sort);
        }

        return movies.lean();
    }

    async findOne<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions,
    ): Promise<T> {
        const movie = this.movieModel.findOne(find);
        return movie.lean();
    }
    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.movieModel.countDocuments(find);
    }
    async serializationList(
        data: MovieDocument[]
    ): Promise<MovieListSerialization[]> {
        return plainToInstance(MovieListSerialization, data);
    }

}

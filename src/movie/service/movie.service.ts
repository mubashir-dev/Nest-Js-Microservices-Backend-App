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
import { AuthJwtGuard } from '../../auth/auth.decorator';

@Injectable()
export class MovieService {
    constructor(
        @DatabaseEntity(MovieEntity.name)
        private readonly movieModel: Model<MovieDocument>,
    ) {
    }
    @AuthJwtGuard()
    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions,
    ): Promise<MovieDocument[]> {
        const movies = this.movieModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                description: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$category',
            },
            {
                $lookup: {
                    from: 'movieRating',
                    let: { 'movieId': '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$movie', '$$movieId'] },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                ratingAvg: {
                                    $avg: '$rating',
                                },
                            },
                        },
                    ],
                    as: 'rating',
                },

            },
            {
                $unwind:{
                    "path":"$rating",
                    "preserveNullAndEmptyArrays":true
                }
            },
            {
                $match: {

                }
            },
            {
                $addFields:{
                    "movieRating":{$ifNull:["$rating.ratingAvg",0]}
                }
            },
            {
                $project: {
                    _id: 1,
                    title:1,
                    description:1,
                    category:1,
                    rating: { $ifNull:["$movieRating",0]},
                    isActive:1,
                    createAt:1,
                    updatedAt:1
                },
            },


        ]);
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

        return movies;
    }

    @AuthJwtGuard()
    async findRecommendedAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions,
    ): Promise<MovieDocument[]> {
        const movies = this.movieModel.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                description: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$category',
            },
            {
                $lookup: {
                    from: 'movieRating',
                    let: { 'movieId': '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$movie', '$$movieId'] },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                ratingAvg: {
                                    $avg: '$rating',
                                },
                            },
                        },
                    ],
                    as: 'rating',
                },

            },
            {
                $unwind:{
                    "path":"$rating",
                    "preserveNullAndEmptyArrays":true
                }
            },
            {
                $addFields:{
                    "movieRating":{$ifNull:["$rating.ratingAvg",0]}
                }
            },
            {
                $match:
                    {
                        $or:[
                            {"movieRating":{"$in":[2.5,2.0]}},
                            {"movieRating":{"$in":[1.0,0]}}
                        ],
                    }

            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 1,
                    title:1,
                    description:1,
                    category:1,
                    rating: { $ifNull:["$movieRating",0]},
                    isActive:1,
                    createAt:1,
                    updatedAt:1
                },
            },
        ]);
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

        return movies;
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
        data: MovieDocument[],
    ): Promise<MovieListSerialization[]> {
        return plainToInstance(MovieListSerialization, data);
    }

}


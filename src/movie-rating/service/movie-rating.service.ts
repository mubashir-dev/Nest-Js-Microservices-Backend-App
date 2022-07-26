import { Injectable } from '@nestjs/common';
import { Model, Schema, Types, ObjectId } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import { MovieRatingDocument, MovieRatingEntity } from '../schema/movieRating.schema';
import { MovieRatingCreateDto } from '../dto/movieRating.create.dto';

@Injectable()
export class MovieRatingService {
    constructor(
        @DatabaseEntity(MovieRatingEntity.name)
        private readonly movieRatingModel: Model<MovieRatingDocument>,
    ) {
    }

    async create(user: string, {
        movie,
        rating,
    }: MovieRatingCreateDto): Promise<MovieRatingDocument> {
        console.log('u-r', user);
        const userId = new Types.ObjectId(user);
        const movieId = new Types.ObjectId(movie);
        const ratingExists = await this.movieRatingModel.findOne({ user: userId, movie: movieId });
        if (!ratingExists) {
            const create: MovieRatingDocument = new this.movieRatingModel({
                movie: new Types.ObjectId(movie),
                user: new Types.ObjectId(user),
                rating: rating
                ,
            });
            return create.save();
        }
        ratingExists.rating = parseInt(rating);
        return ratingExists.save();
    }
    async findUserReviewedMovies(user: string): Promise<any[]> {
        const userId = new Types.ObjectId(user);
        console.log('userId',userId);
        const ratedMovies = this.movieRatingModel.aggregate([
            {
                $match:{
                    user:userId
                }
            },
            {
                $lookup: {
                    from: 'movies',
                    localField: 'movie',
                    foreignField: '_id',
                    as: 'ratedMovies',
                    pipeline: [
                        {
                            $project: {
                                _id:1,
                                title:1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind:"$ratedMovies"
            },
            {
                $addFields:{
                    'title':"$ratedMovies.title"
                }
            },
            {
                $project:{
                    title:1,
                }
            }
        ]);
        return ratedMovies;
    }

}

import { Injectable } from '@nestjs/common';
import { Model, Types, ObjectId } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import { UserMoviePreferenceDocument, UserMoviePreferenceEntity } from '../schema/user-movie-preference.schema';
import { UserMoviePreferenceCreateDto } from '../dto/user-movie-preference.create.dto';
import { IDatabaseFindOneOptions } from '../../database/database.interface';
import { User } from '../../auth/auth.decorator';

@Injectable()
export class UserMoviePreferenceService {
    constructor(
        @DatabaseEntity(UserMoviePreferenceEntity.name)
        private readonly userMoviePreferenceModel: Model<UserMoviePreferenceDocument>,
    ) {
    }

    async create(user: string, {
        category,
    }: UserMoviePreferenceCreateDto): Promise<UserMoviePreferenceDocument> {
        const userId = new Types.ObjectId(user);
        const categoryId = new Types.ObjectId(category);
        const create: UserMoviePreferenceDocument = new this.userMoviePreferenceModel({
            category: new Types.ObjectId(categoryId),
            user: new Types.ObjectId(user),
        });
        return create.save();
    }

    async findUserMoviePreference<T>(
        find?: Record<string, any>,
        _id?:string,
        options?: IDatabaseFindOneOptions,
    ): Promise<any[]> {
        const userPreferences = this.userMoviePreferenceModel.aggregate([
            {
                $match:{
                    user:new Types.ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'moviePreferences',
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
              $unwind:"$moviePreferences"
            },
            {
                $addFields:{
                    'title':"$moviePreferences.title"
                }
            },
            {
                $project:{
                    title:1,
                }
            }
        ]);
        return userPreferences;
    }

}

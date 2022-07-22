import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MovieEntity } from 'src/movie/schema/movie.schema';
import { UserEntity } from 'src/user/schema/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class MovieRatingEntity {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: MovieEntity.name,
    })
    movie: Types.ObjectId;
    @Prop({
        required: true,
    })
    rating: number;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: UserEntity.name,
    })
    user: Types.ObjectId;
}

export const MovieRatingDatabaseName = 'movieRating';
export const MovieRatingSchema = SchemaFactory.createForClass(MovieRatingEntity);
export type MovieRatingDocument = MovieRatingEntity & Document;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserEntity } from 'src/user/schema/user.schema';
import { CategoryEntity } from '../../movie-category/schema/category.schema';

@Schema({ timestamps: true, versionKey: false })
export class UserMoviePreferenceEntity {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: CategoryEntity.name,
        unique:true
    })
    category: Types.ObjectId;
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: UserEntity.name,
    })
    user: Types.ObjectId;
}

export const UserMoviePreferenceDatabaseName = 'userMoviePreferences';
export const UserMoviePreferenceSchema = SchemaFactory.createForClass(UserMoviePreferenceEntity);
export type UserMoviePreferenceDocument = UserMoviePreferenceEntity & Document;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEntity } from '../../movieCategory/schema/category.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class MovieEntity {
    @Prop({
        required: true,
        unique: true,
    })
    title: string;
    @Prop({
        required: false,
    })
    description?: string;
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: CategoryEntity.name,
    })
    category: Types.ObjectId;
    @Prop({
        required: true,
    })
    isActive: boolean;
}

export const MovieDatabaseName = 'movies';
export const MovieSchema = SchemaFactory.createForClass(MovieEntity);
export type MovieDocument = MovieEntity & Document;

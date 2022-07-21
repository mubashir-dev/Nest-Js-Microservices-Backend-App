import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class CategoryEntity {
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
    })
    isActive: boolean;
}

export const CategoryDatabaseName = 'categories';
export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
export type CategoryDocument = CategoryEntity & Document;

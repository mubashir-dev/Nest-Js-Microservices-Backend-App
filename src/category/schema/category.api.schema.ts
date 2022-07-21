import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class CategoryApiEntity {
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

export const CategoryApiDatabaseName = 'categories';
export const CategoryApiSchema = SchemaFactory.createForClass(CategoryApiEntity);

export type CategoryApiDocument = CategoryApiEntity & Document;

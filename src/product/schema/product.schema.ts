import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CategoryApiEntity } from '../../category/schema/category.api.schema';

@Schema({ timestamps: true, versionKey: false })
export class ProductEntity {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    })
    category: CategoryApiEntity;
    @Prop({
        required: true,
    })
    isActive: boolean;
}

export const ProductDatabaseName = 'products';
export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
export type ProductDocument = ProductEntity & Document;

import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { DatabaseEntity } from 'src/database/database.decorator';
import { DeleteResult } from 'mongodb';
import { MovieDocument, MovieEntity } from '../schema/movie.schema';
import { MovieCreateDto } from '../dto/movie.create.dto';


@Injectable()
export class MovieBulkService {
    constructor(
        @DatabaseEntity(MovieEntity.name)
        private readonly productModel: Model<MovieDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.productModel.deleteMany(find);
    }

    async createMany(data: MovieCreateDto[]): Promise<MovieDocument[]> {
        console.log('data',data);
        return this.productModel.insertMany(
            data.map(({ title, description, category }) => ({
               title,
                description,
                category:new Types.ObjectId(category),
                isActive:true
            }))
        );
    }
}

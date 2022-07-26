import { Command } from 'nestjs-command';
import { MovieBulkService } from 'src/movie/service/movie.builkService';
import { CategoryDocument } from '../../movie-category/schema/category.schema';
import { CategoryService } from '../../movie-category/service/category.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieSeed {
    constructor(
        private readonly movieBulkService:MovieBulkService,
        private readonly categoryService:CategoryService,
    ) {}

    @Command({
        command: 'insert:movie',
        describe: 'insert movies',
    })
    async insert(): Promise<void> {
        const categories: CategoryDocument[] =
            await this.categoryService.findAll();
        try {
            await this.movieBulkService.createMany([
                {
                    title:'Avatar',
                    description:'Avatar description',
                    category:categories[0]._id,
                },
                {
                    title:'Interstellar',
                    description:'Interstellar description',
                    category:categories[1]._id,
                },
                {
                    title:'Fast and Furious 8',
                    description:'Fast and Furious 8 description',
                    category:categories[2]._id,
                },
                {
                    title:'Z War',
                    description:'Z War description',
                    category:categories[3]._id,
                },
                {
                    title:'Z Nation',
                    description:'Z Nation description',
                    category:categories[3]._id,
                },
                {
                    title:'Last Man on Earth',
                    description:'Last Man description',
                    category:categories[3]._id,
                },
                {
                    title:'1917',
                    description:'1917 description',
                    category:categories[3]._id,
                },
                {
                    title:'Titanic',
                    description:'Titanic description',
                    category:categories[3]._id,
                },
                {
                    title:'Big Game',
                    description:'Power Game description',
                    category:categories[3]._id,
                },
                {title:'The 100',
                    description:'The 100 description',
                    category:categories[3]._id,}
            ]);
        } catch (e) {
            throw new Error(e.message);
        }

        return;
    }

    @Command({
        command: 'remove:movie',
        describe: 'remove movies',
    })
    async remove(): Promise<void> {
        try {
            await this.movieBulkService.deleteMany({});
        } catch (e) {
            throw new Error(e.message);
        }

        return;
    }
}

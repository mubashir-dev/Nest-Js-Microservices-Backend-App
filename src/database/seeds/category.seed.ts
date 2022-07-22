import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CategoryBulkService } from '../../movie-category/service/category.bulkService';

@Injectable()
export class CategorySeed {
    constructor(
        private readonly categoryBulkService:CategoryBulkService,
    ) {}

    @Command({
        command: 'insert:category',
        describe: 'insert categories',
    })
    async insert(): Promise<void> {

        try {
            await this.categoryBulkService.createMany([
                {
                    title:'Animated',
                    description:'Animated, description'
                },
                {
                    title:'Comedy',
                    description:'Comedy description'
                },
                {
                    title:'Horror',
                    description:'Horror description'
                },
                {
                    title:'Sci-Fi',
                    description:'Sci-Fi description'
                },
                {
                    title:'Action',
                    description:'Action description'
                }
            ]);
        } catch (e) {
            throw new Error(e.message);
        }

        return;
    }

    @Command({
        command: 'remove:category',
        describe: 'remove categories',
    })
    async remove(): Promise<void> {
        try {
            await this.categoryBulkService.deleteMany({});
        } catch (e) {
            throw new Error(e.message);
        }

        return;
    }
}

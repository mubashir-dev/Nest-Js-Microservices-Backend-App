import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ProductBulkService } from 'src/product/service/product.builk.service';
import { CategoryApiDocument } from '../../category/schema/category.api.schema';
import { CategoryService } from '../../category/service/category.service';

@Injectable()
export class ProductSeed {
    constructor(
        private readonly productBulkService:ProductBulkService,
        private readonly categoryService:CategoryService,
    ) {}

    @Command({
        command: 'insert:product',
        describe: 'insert products',
    })
    async insert(): Promise<void> {
        const categories: CategoryApiDocument[] =
            await this.categoryService.findAll();

        try {
            await this.productBulkService.createMany([
                {
                    title:'Product 1',
                    description:'Product 1 description',
                    category:categories[0]._id,
                },
                {
                    title:'Product 2',
                    description:'Product 2 description',
                    category:categories[1]._id,
                },
                {
                    title:'Product 3',
                    description:'Product 3 description',
                    category:categories[2]._id,
                },
                {
                    title:'Product 4',
                    description:'Product 4 description',
                    category:categories[3]._id,
                },

            ]);
        } catch (e) {
            throw new Error(e.message);
        }

        return;
    }

    @Command({
        command: 'remove:product',
        describe: 'remove products',
    })
    async remove(): Promise<void> {
        try {
            await this.productBulkService.deleteMany({});
        } catch (e) {
            throw new Error(e.message);
        }

        return;
    }
}

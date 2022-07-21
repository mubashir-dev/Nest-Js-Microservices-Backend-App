import { Module } from '@nestjs/common';
import { MovieModule } from 'src/movie/movie.module';
import { MovieController } from '../movie/controller/movie.controller';

@Module({
    controllers: [MovieController],
    providers: [],
    exports: [],
    imports: [MovieModule],
})
export class RouterUserModule {}

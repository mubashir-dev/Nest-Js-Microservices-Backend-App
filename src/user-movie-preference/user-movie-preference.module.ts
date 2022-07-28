import { Module } from '@nestjs/common';
import { UserMoviePreferenceController } from './controller/user-movie-preference.controller';
import { UserMoviePreferenceService } from './service/user-movie-preference.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../database/database.constant';
import {
    UserMoviePreferenceDatabaseName,
    UserMoviePreferenceEntity,
    UserMoviePreferenceSchema,
} from './schema/user-movie-preference.schema';
import { UserDatabaseName, UserEntity, UserSchema } from '../user/schema/user.schema';
import { CategoryDatabaseName, CategoryEntity, CategorySchema } from 'src/movie-category/schema/category.schema';

@Module({
    controllers: [UserMoviePreferenceController],
    providers: [UserMoviePreferenceService],
    exports:[UserMoviePreferenceService],
    imports: [MongooseModule.forFeature(
        [
            {
                name: UserMoviePreferenceEntity.name,
                schema: UserMoviePreferenceSchema,
                collection: UserMoviePreferenceDatabaseName,
            },
            {
                name: CategoryEntity.name,
                schema: CategorySchema,
                collection: CategoryDatabaseName,
            },

        ],
        DATABASE_CONNECTION_NAME,
    )],
})
export class UserMoviePreferenceModule {
}

import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PermissionModule } from 'src/permission/permission.module';
import { PermissionSeed } from 'src/database/seeds/permission.seed';
import { RoleSeed } from './role.seed';
import { RoleModule } from 'src/role/role.module';
import { UserSeed } from './user.seed';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { AuthApiSeed } from './auth.api.seed';
import { SettingSeed } from './setting.seed';
import { MovieCategoryModule } from 'src/movie-category/movieCategory.module'
import { CategorySeed } from './category.seed';
import { MovieModule } from '../../movie/movie.module';
import { MovieSeed } from './movie.seed';


@Module({
    imports: [
        CoreModule,
        CommandModule,
        PermissionModule,
        AuthModule,
        UserModule,
        RoleModule,
        MovieCategoryModule,
        MovieModule
    ],
    providers: [AuthApiSeed,CategorySeed,MovieSeed, PermissionSeed, RoleSeed, UserSeed, SettingSeed],
    exports: [],
})
export class SeedsModule {}

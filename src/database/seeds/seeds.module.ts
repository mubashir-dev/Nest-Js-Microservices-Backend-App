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
import { CategoryModule } from 'src/category/category.module'
import { CategorySeed } from './category.api.seed';
import { ProductModule } from '../../product/product.module';
import { ProductSeed } from './product.seed';


@Module({
    imports: [
        CoreModule,
        CommandModule,
        PermissionModule,
        AuthModule,
        UserModule,
        RoleModule,
        CategoryModule,
        ProductModule
    ],
    providers: [AuthApiSeed,CategorySeed,ProductSeed, PermissionSeed, RoleSeed, UserSeed, SettingSeed],
    exports: [],
})
export class SeedsModule {}

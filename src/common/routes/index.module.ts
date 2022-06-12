import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AddressesModule } from '../../components/addresses/addresses.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { UsersModule } from '../../components/users/users.module';
import { CategoriesModule } from '../../components/categories/categories.module';
import { BrandModule } from 'src/components/brand/brand.module';

@Module({
  imports: [
    AddressesModule,
    UsersModule,
    AuthenticationModule,
    CategoriesModule,
    BrandModule,
    RouterModule.register([
      {
        path: 'api/v1',
        module: UsersModule,
      },
      {
        path: 'api/v1',
        module: BrandModule,
      },
      {
        path: 'api/v1',
        module: AuthenticationModule,
      },
      {
        path: 'api/v1',
        module: AddressesModule,
      },
      {
        path: 'api/v1',
        module: CategoriesModule,
      },
    ]),
  ],
})
export class IndexRoutesModule {}

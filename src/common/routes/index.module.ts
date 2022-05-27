import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AddressesModule } from 'src/components/addresses/addresses.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UsersModule } from 'src/components/users/users.module';
import { CategoriesModule } from '../../components/categories/categories.module';

@Module({
  imports: [
    AddressesModule,
    UsersModule,
    AuthenticationModule,
    CategoriesModule,
    RouterModule.register([
      {
        path: 'api/v1',
        module: UsersModule,
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

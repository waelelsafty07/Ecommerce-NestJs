import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from '../addresses/entity/address.entity';
import User from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

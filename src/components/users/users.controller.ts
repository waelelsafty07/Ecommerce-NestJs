import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationQureyDto } from '../../common/dto/pagination-qurey.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() paginationQuery: PaginationQureyDto) {
    return this.usersService.findAll(paginationQuery);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '../../authentication/guards/jwt-authentication.guard';
import { PaginationQureyDto } from '../../common/dto/pagination-qurey.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  /*
   * @desc   Get All Category
   * @route  GET /api/v1/Categories
   * @access Public
   */
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get()
  findAll(@Query() paginationQuery: PaginationQureyDto) {
    return this.categoriesService.findAll(paginationQuery);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoriesService.create(createCategoriesDto);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriesDto: UpdateCategoriesDto,
  ) {
    return this.categoriesService.update(id, updateCategoriesDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

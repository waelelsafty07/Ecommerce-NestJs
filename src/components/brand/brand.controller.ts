import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import RequestWithUser from '../../authentication/interfaces/requestWithUser.interface';
import { PaginationQureyDto } from '../../common/dto/pagination-qurey.dto';
import { BrandsService } from './brand.service';
import { CreateBrandsDto } from './dto/create-brands.dto';
import { UpdateBrandsDto } from './dto/update-brands.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandsService: BrandsService) {}
  /*
   * @desc   Get All Category
   * @route  GET /api/v1/Categories
   * @access Public
   */
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get()
  findAll(@Query() paginationQuery: PaginationQureyDto) {
    return this.brandsService.findAll(paginationQuery);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Body() createBrandsDto: CreateBrandsDto,
    @Req() req: RequestWithUser,
  ) {
    return this.brandsService.create(createBrandsDto, req.user);
  }
  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param('id') id: string,
    @Body() updateBrandsDto: UpdateBrandsDto,
    @Req() req: RequestWithUser,
  ) {
    return this.brandsService.update(id, updateBrandsDto, req.user);
  }
  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.brandsService.remove(id, req.user);
  }
}

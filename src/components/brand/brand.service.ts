import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQureyDto } from '../../common/dto/pagination-qurey.dto';
import { Repository } from 'typeorm';
import { Brand } from './entity/brand.entity';
import { BrandNotFoundException } from './exception/brandNotFound.exception';
import { CreateBrandsDto } from './dto/create-brands.dto';
import User from '../users/entity/user.entity';
import { UpdateBrandsDto } from './dto/update-brands.dto';
import { brandNotBelongToYouException } from './exception/brandAuthorization.exception';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  findAll(paginationQuery: PaginationQureyDto) {
    const { page, limit } = paginationQuery;
    return this.brandRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async findOne(id: string) {
    const Brand = await this.brandRepository.findOne(id);
    if (!Brand) throw new BrandNotFoundException(+id);
    return Brand;
  }
  async create(createBrandsDto: CreateBrandsDto, user: User) {
    const Brand = this.brandRepository.create({
      ...createBrandsDto,
      user,
    });
    return this.brandRepository.save(Brand);
  }

  async update(id: string, updateBrandsDto: UpdateBrandsDto, user: User) {
    const Brand = await this.brandRepository.findOne(id, {
      relations: ['user'],
    });
    if (!Brand) throw new BrandNotFoundException(+id);
    if (Brand.user.id !== user.id) throw new brandNotBelongToYouException(+id);

    return this.brandRepository.update(id, updateBrandsDto);
  }
  async remove(id: string, user: User) {
    const Brand = await this.brandRepository.findOne(id);
    if (!Brand) throw new BrandNotFoundException(+id);
    if (Brand.user.id !== user.id) throw new brandNotBelongToYouException(+id);
    return this.brandRepository.remove(Brand);
  }
}

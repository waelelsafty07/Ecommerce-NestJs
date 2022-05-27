import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQureyDto } from '../../common/dto/pagination-qurey.dto';
import { CreateCategoriesDto } from './dto/create-categories.dto';
import { UpdateCategoriesDto } from './dto/update-categories.dto';
import { Category } from './entity/category.entity';
import { CategoryNotFoundException } from './exception/categoryNotFound.exception';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly connection: Connection,
  ) {}
  findAll(paginationQuery: PaginationQureyDto) {
    const { page, limit } = paginationQuery;
    return this.categoryRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async findOne(id: string) {
    const Category = await this.categoryRepository.findOne(id);
    if (!Category) throw new CategoryNotFoundException(+id);
    return Category;
  }
  async create(createCategoriesDto: CreateCategoriesDto) {
    const Category = this.categoryRepository.create(createCategoriesDto);
    return this.categoryRepository.save(Category);
  }
  async update(id: string, updateCategoriesDto: UpdateCategoriesDto) {
    const Category = await this.categoryRepository.preload({
      id: +id,
      ...updateCategoriesDto,
    });
    if (!Category) throw new CategoryNotFoundException(+id);
    return this.categoryRepository.save(Category);
  }
  async remove(id: string) {
    const Category = await this.categoryRepository.findOne(id);
    if (!Category) throw new CategoryNotFoundException(+id);
    return this.categoryRepository.remove(Category);
  }
}

/**
 * 
 *  
 1591  sudo lsof -i -P -n | grep 5432
 1592  sudo kill -9 1324n
 1593  sudo docker-compose up -d
 */

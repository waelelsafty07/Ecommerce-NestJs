import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQureyDto } from '../../common/dto/pagination-qurey.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import User from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(paginationQuery: PaginationQureyDto) {
    const { page, limit } = paginationQuery;
    return this.usersRepository.find({
      relations: ['address'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne(
      { email },
      { relations: ['address'] },
    );
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}

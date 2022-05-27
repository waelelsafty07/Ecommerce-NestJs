import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});
describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoriesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Category),
          useValue: createMockRepository(),
        },
      ],
      exports: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<MockRepository>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when category with id exist', () => {
      it('should return the category object', async () => {
        const categoryId = '50';
        const expectedCategory = {};
        categoriesRepository.findOne.mockReturnValue(expectedCategory);
        const Category = await service.findOne(categoryId);
        expect(Category).toEqual(expectedCategory);
      });
    });
    describe('otherwise', () => {
      it('should throw "NotFoundException', async () => {
        const categoryId = '1';
        categoriesRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(categoryId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Category #${categoryId} Not Founded`);
        }
      });
    });
  });
});

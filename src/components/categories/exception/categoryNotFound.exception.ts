import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Category #${id} Not Founded`);
  }
}

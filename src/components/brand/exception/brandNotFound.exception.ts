import { NotFoundException } from '@nestjs/common';

export class BrandNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Brand #${id} Not Founded`);
  }
}

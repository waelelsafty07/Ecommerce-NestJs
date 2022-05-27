import { NotFoundException } from '@nestjs/common';

export class addressNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Address #${id} Not Founded`);
  }
}

import { UnauthorizedException } from '@nestjs/common';

export class categoriesNotBelongToYouException extends UnauthorizedException {
  constructor(id: number) {
    super(`This Address #${id} Not Belong To You`);
  }
}

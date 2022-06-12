import { UnauthorizedException } from '@nestjs/common';

export class brandNotBelongToYouException extends UnauthorizedException {
  constructor(id: number) {
    super(`This Brand #${id} Not Belong To You`);
  }
}

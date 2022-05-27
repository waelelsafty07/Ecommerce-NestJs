import { PartialType } from '@nestjs/swagger';
import { CreateAddressesDto } from './create-addresses.dto';

export class UpdateAddressesDto extends PartialType(CreateAddressesDto) {}

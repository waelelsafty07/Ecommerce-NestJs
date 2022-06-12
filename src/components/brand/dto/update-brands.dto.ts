import { PartialType } from '@nestjs/swagger';
import { CreateBrandsDto } from './create-brands.dto';

export class UpdateBrandsDto extends PartialType(CreateBrandsDto) {}

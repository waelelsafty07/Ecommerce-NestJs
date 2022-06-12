import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBrandsDto {
  @ApiProperty({ description: 'The Name  of Brand' })
  @IsString()
  readonly name: string;
  @ApiProperty({ description: 'The description of Brand' })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ description: 'The Logo of Brand' })
  @IsString()
  readonly image: string;
}

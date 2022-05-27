import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoriesDto {
  @ApiProperty({ description: 'The Name  of category' })
  @IsString()
  readonly name: string;
  @ApiProperty({
    description: 'The Description  of category and u can set it Optional',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({
    description: 'The Description  of category and Required',
  })
  @IsString()
  readonly image: string;
}

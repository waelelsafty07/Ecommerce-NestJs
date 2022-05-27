import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAddressesDto {
  @ApiProperty({ description: 'The Street Name' })
  @IsString()
  readonly street: string;
  @ApiProperty({
    description: 'The City Name',
  })
  @IsString()
  readonly city: string;
  @ApiProperty({
    description: 'The Country name',
  })
  @IsString()
  readonly country: string;
}

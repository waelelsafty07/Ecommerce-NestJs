import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The Name  of User' })
  @IsString()
  readonly name: string;
  @ApiProperty({
    description: 'The Email  of User',
  })
  @IsString()
  readonly email: string;
  @ApiProperty({
    description: 'The Password  of user ',
  })
  @IsString()
  readonly password: string;
}

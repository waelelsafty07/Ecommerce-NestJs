import { IsString } from 'class-validator';

export class RegisterDataDto {
  @IsString()
  email: string;
  @IsString()
  name: string;
  @IsString()
  password: string;
}

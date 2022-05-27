import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQureyDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  page?: number;
}

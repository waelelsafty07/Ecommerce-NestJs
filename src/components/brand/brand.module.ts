import { Module } from '@nestjs/common';
import { BrandsService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Brand } from './entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), ConfigModule],
  providers: [BrandsService],
  controllers: [BrandController],
})
export class BrandModule {}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/interfaces/requestWithUser.interface';
import { AddressesService } from './addresses.service';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { UpdateAddressesDto } from './dto/update-addresses.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}
  /*
   * @desc   Post specific Address
   * @route  POST /api/v1/addresses
   * @access Private/Users
   */
  @Post()
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Body()
    createAddressesDto: CreateAddressesDto,
    @Req() req: RequestWithUser,
  ) {
    return this.addressesService.create(createAddressesDto, req.user);
  }
  /*
   * @desc   Update specific Address by id and check address belong to user or not
   * @route  UPDATE /api/v1/addresses/id
   * @access Private/Users
   */
  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body()
    updateAddressesDto: UpdateAddressesDto,
    @Req() req: RequestWithUser,
  ) {
    return this.addressesService.updateAddress(
      id,
      updateAddressesDto,
      req.user,
    );
  }
}

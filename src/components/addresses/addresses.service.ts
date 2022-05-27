import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/components/users/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { addressNotFoundException } from './exception/addressNotFund.exception';
import { UpdateAddressesDto } from './dto/update-addresses.dto';
import Address from './entity/address.entity';
import { addressNotBelongToYouException } from './exception/addressAuthorization.exception';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(createAddressesDto: CreateAddressesDto, user: User) {
    const Address = this.addressRepository.create({
      ...createAddressesDto,
      user,
    });
    return this.addressRepository.save(Address);
  }
  async updateAddress(
    id: string,
    updateAddressDto: UpdateAddressesDto,
    user: User,
  ) {
    const address = await this.addressRepository.findOne(id);
    if (!address) throw new addressNotFoundException(+id);
    if (address.user.id !== user.id)
      throw new addressNotBelongToYouException(+id);
    console.log(address.user, user);

    return this.addressRepository.update(id, updateAddressDto);
  }
}

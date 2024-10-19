import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/createAdress.dto';
import { updateAddressDto } from './dto/updateAddress.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('/:id')
  async getAddress(@Param('id') id: string) {
    const address = await this.addressService.getAddress(+id);
    if (!address) {
      return new HttpException('Failed to get address', HttpStatus.NOT_FOUND);
    }

    return { message: 'Successfully returned address', results: address };
  }

  @Post('/create')
  async createAddress(@Body() body: CreateAddressDto) {
    const address = await this.addressService.createAddress(body);

    if (!address) {
      return new HttpException('Something went wrong', HttpStatus.NOT_FOUND);
    }

    return { message: 'Successfully created address', results: address };
  }

  @Patch('/update/:id')
  async updateAddress(@Body() body: updateAddressDto, @Param('id') id: string) {
    const updatedAddress = await this.addressService.updateAddress(body, +id);
    console.log('In controller 1 ', updatedAddress);
    if (!updatedAddress) {
      return new HttpException(
        'Failed to update address',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('In controller 2 ', updateAddressDto);
    return { message: 'Successfully updated address', results: updatedAddress };
  }

  @Delete('delete/:id')
  async deleteAddress(@Param('id') id: string) {
    const deletedAddress = await this.addressService.deleteAddress(+id);
    if (!deletedAddress) {
      return new HttpException(
        'Failed to delete address',
        HttpStatus.SEE_OTHER,
      );
    }

    return { message: 'Successfully deleted address', results: deletedAddress };
  }
}

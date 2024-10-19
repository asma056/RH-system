import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Roles } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '../common/decorators/roles.decorators';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/updatePassword';

@ApiTags('user')
@Controller('user')
//@UseGuards(AccessTokenGuard, RolesGuard)
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Get('/all')
  async getUsers() {
    console.log('-/--/')
    const users = await this.userService.getAll();
    return { message: 'Successfully retrieved users', results: users };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    console.log(id);
    const user = await this.userService.get(+id);
    return { message: 'Successfully retrieved user', results: user };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return { message: 'User created successfully', results: user };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Patch('/update/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const updatedUser = await this.userService.update(+id, body);
    return { message: 'User updated successfully', results: updatedUser };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: number) {
    const deletedUser = await this.userService.delete(+id);
    return { message: 'User deleted successfully', results: deletedUser };
  }




  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Put('/password/:id')
  async updateUserPassword(@Param('id') id: number, @Body() body: UpdatePasswordDto) {
    try {
      const rep = await this.userService.updatePassword(+id, body);
      return { message: "Password updated", results: rep };
    } catch (error) {
      // Gérez les erreurs ici, vous pouvez les logger ou renvoyer une réponse appropriée
      console.error("Erreur lors de la mise à jour du mot de passe :", error);
      throw new HttpException("Erreur lors de la mise à jour du mot de passe", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  }

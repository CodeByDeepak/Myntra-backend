import {
  Body,
  Controller,
  UseGuards,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from '@nestjs/common';

import { UpdateUserDto } from './Dto/updateUserDto';
import { User } from './user.entity';
import { UpdateResult } from 'typeorm';
import { Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findByUserId')
  async findOne(@Query('userId') userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      return 'User Not Found';
    } else {
      return user;
    }
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const userExist = await this.userService.findOne(userId);
    if (userExist) {
      return this.userService.updateUser(userId, updateUserDto);
    } else {
      throw new NotFoundException('User not found with id ' + userId);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number): Promise<void> {
    const userExist: User = await this.userService.findOne(userId);
    if (userExist) {
      await this.userService.deleteUser(userId);
      console.log('success');
    } else {
      throw new NotFoundException('User not found for id' + { userId });
    }
  }
  @Delete()
  async deleteAllUser(): Promise<void> {
    await this.userService.deleteAllUser();
  }

}

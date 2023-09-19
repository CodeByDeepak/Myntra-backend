import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './Dto/updateUserDto';
import { SignUpDto } from './Dto/signUpDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }
  async signUp(signUpDto: SignUpDto) {
    const user = new User();
    user.email = signUpDto.email;
    user.userName = signUpDto.userName;
    user.createdDt = new Date();
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(signUpDto.password, saltRounds);
      user.password = hashedPassword;
      return this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  async findByUsername(userName: string) {
    try {
      return await this.userRepository.findOne({
        where: {
          userName: userName,
        },
      });
    } catch (e) {
      throw new NotFoundException('User not found!');
    }
  }

  async findOne(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }

  async deleteUser(userId: number) {
    await this.userRepository.delete(userId);
  }
  async deleteAllUser(): Promise<void> {
    await this.userRepository.delete({});
  }

  async isUserRegistered(userName: string, email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ userName }, { email }],
    });
    if (user) {
      return 'User is already registered with this email and userName';
    }
  }
}

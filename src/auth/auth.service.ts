import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { SignInDto } from '../user/Dto/signInDto';

import { SignUpDto } from '../user/Dto/signUpDto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    return await this.userService.signUp(signUpDto);
  }
  async findUserByUsername(signUpDto: SignUpDto) {
    const user = await this.userService.findByUsername(signUpDto.userName);
    if (!user) {
      return null;
    }
    return user;
  }
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByUsername(signInDto.userName);
    if (!user) {
      throw new UnauthorizedException(
        'User not found with username: ' + signInDto.userName,
      );
    }
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

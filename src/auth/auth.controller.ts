import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/user/Dto/signUpDto';
import { SignInDto } from 'src/user/Dto/signInDto';
import { JwtAuthGuard } from './guards/auth.guard';
import { GenericResponse } from 'src/model/generic.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    console.log(
      'in login ' + signInDto.userName + ' password: ' + signInDto.password,
    );
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    try {
      const userExist = await this.authService.findUserByUsername(signUpDto);
      if (userExist != null) {
        return new GenericResponse(
          200,
          'User already exist with username ' + signUpDto.userName,
          '0',
          {},
        );
      }
      const userData = await this.authService.signUp(signUpDto);
      if (userData) {
        return new GenericResponse(
          201,
          'User created successfully',
          '0',
          userData,
        );
      }
    } catch (error) {
      return new GenericResponse(404, error.message, 'error', {});
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { SignInDto } from 'src/user/Dto/signInDto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const signInDto = new SignInDto();
    signInDto.userName = username;
    signInDto.password = password;
    const user = await this.authService.signIn(signInDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

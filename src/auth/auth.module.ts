import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { userProviders } from 'src/user/user.provider';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    ...userProviders,
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

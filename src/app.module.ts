import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DatabaseModule, TypeOrmModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

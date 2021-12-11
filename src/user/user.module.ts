import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserResolver } from './user.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../Security/jwt.strategy';
import { TokenService } from '../token/token.service';
import { LoginResponse } from '../GraphQl/ResponseTypes';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT_ACCESS_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    UserResolver,
    ConfigService,
    JwtStrategy,
    TokenService,
    LoginResponse,
  ],
})
export class UserModule {}

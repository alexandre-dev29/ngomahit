import { Module } from '@nestjs/common';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MutationResponse } from '../GraphQl/ResponseTypes';

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
  providers: [TokenResolver, TokenService, PrismaService, MutationResponse],
})
export class TokenModule {}

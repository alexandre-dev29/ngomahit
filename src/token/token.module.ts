import { Module } from '@nestjs/common';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TokenResolver, TokenService, PrismaService],
})
export class TokenModule {}

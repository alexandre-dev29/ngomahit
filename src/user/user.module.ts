import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserService, PrismaService, UserResolver],
})
export class UserModule {}

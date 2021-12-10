import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}

  async findOneTOkenByToken(searchedToken: string): Promise<Token | null> {
    return this.prismaService.tokens.findFirst({
      where: { token: searchedToken },
    });
  }
  async findAllTokens(): Promise<Token[]> {
    return this.prismaService.tokens.findMany();
  }

  async createRefreshToken(currentToken: string): Promise<Token | any> {
    try {
      const isTokenExists = await this.prismaService.tokens.findMany({
        where: { token: currentToken },
      });
      if (isTokenExists.length > 1) {
        return isTokenExists[0];
      } else {
        return this.prismaService.tokens.create({
          data: { token: currentToken },
        });
      }
    } catch (e) {
      return false;
    }
  }

  async deleteRefreshToken(refreshToken: string): Promise<Token | any> {
    try {
      const dbToken = await this.prismaService.tokens.findFirst({
        where: { token: refreshToken },
      });
      this.prismaService.tokens.delete({
        where: { token_id: dbToken.token_id },
      });
    } catch (e) {
      return false;
    }
  }
}

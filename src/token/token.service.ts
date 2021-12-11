import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Token } from './token.entity';
import { MutationResponse } from '../GraphQl/ResponseTypes';

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

  async createRefreshToken(
    currentToken: string,
    user_id: number,
  ): Promise<Token | any> {
    try {
      const isTokenExists = await this.prismaService.tokens.findMany({
        where: { token: currentToken },
      });
      if (isTokenExists.length > 0) {
        return isTokenExists[0];
      } else {
        return this.prismaService.tokens.create({
          data: { token: currentToken, user_id: user_id },
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
  async deleteRefreshTokenByUserId(
    user_id: number,
  ): Promise<MutationResponse | any> {
    try {
      const result = this.prismaService.tokens.deleteMany({
        where: { user_id: user_id },
      });
      if (result)
        return {
          responseType: 'Success',
          message: 'All Tokens has been successfully deleted',
        } as MutationResponse;
      else
        return {
          responseType: 'Error',
          message: 'There was an error when trying to delete tokens',
        } as MutationResponse;
    } catch (e) {
      return {
        responseType: 'Error',
        message: 'There was an error when trying to delete tokens',
      } as MutationResponse;
    }
  }
}

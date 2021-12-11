import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import { GraphQLError } from 'graphql';
import { MutationResponse } from '../GraphQl/ResponseTypes';

@Resolver(() => Token)
export class TokenResolver {
  constructor(private tokenService: TokenService) {}

  @Query(() => [Token])
  async getAllTokens() {
    try {
      return this.tokenService.findAllTokens();
    } catch (e) {
      return new GraphQLError('Error when trying to get all tokens');
    }
  }

  @Mutation(() => MutationResponse)
  async deleteTokenByUser(@Args('user_id') user_id: number) {
    return this.tokenService.deleteRefreshTokenByUserId(user_id);
  }
}

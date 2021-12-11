import { Query, Resolver } from '@nestjs/graphql';
import { Token } from './token.entity';
import { TokenService } from './token.service';
import { GraphQLError } from 'graphql';

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
}

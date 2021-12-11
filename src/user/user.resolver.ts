import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from './dto/user.dto';
import { LoginResponse, MutationResponse } from '../GraphQl/ResponseTypes';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async getAllUsers() {
    try {
      return await this.userService.findAllUser();
    } catch (e) {
      return new GraphQLError('There was an error while trying to get Users');
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.userService.loginUser({ username, password });
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.userService.createUser(createUserInput);
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation(() => MutationResponse)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    try {
      return await this.userService.refreshToken(refreshToken);
    } catch (err) {
      console.log(err);
    }
  }
}

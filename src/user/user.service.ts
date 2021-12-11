import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { PrismaService } from '../prisma.service';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRoles, UserStatus } from './dto/UserEnums';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { LoginResponse } from '../GraphQl/ResponseTypes';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async findAllUser(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async createUser(createUserInput: CreateUserInput): Promise<User | any> {
    try {
      const isUserExist = await this.prismaService.user.findUnique({
        where: { username: createUserInput.username },
      });
      if (isUserExist) {
        return new GraphQLError('The User Already Exist');
      } else {
        createUserInput.password = await bcrypt
          .hash(createUserInput.password, 10)
          .then((r) => r);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.prismaService.user.create({
          data: {
            email: createUserInput.email,
            password: createUserInput.password,
            phoneNumber: createUserInput.phoneNumber,
            username: createUserInput.username,
            firstName: createUserInput.firstName,
            lastName: createUserInput.lastName,
            user_role: UserRoles.USER.toString(),
            status: UserStatus.ACTIVE.toString(),
          },
        });
      }
    } catch (e) {
      return new GraphQLError(
        'An Error occured when trying to create a new user',
      );
    }
  }

  async loginUser({ username, password }): Promise<LoginResponse | any> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { username: username },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = await this.jwtService.signAsync(
          {
            username,
            user_id: user.user_id,
            email: user.email,
          },
          { expiresIn: '15m' },
        );
        const refreshToken = await this.jwtService.signAsync(
          {
            username,
            user_id: user.user_id,
            email: user.email,
          },
          { expiresIn: '7d' },
        );
        await this.tokenService.createRefreshToken(refreshToken);
        return { accessToken, refreshToken };
      } else {
        return new GraphQLError(
          'the password or email is invalid please try again',
        );
      }
    } catch (e) {
      return new GraphQLError(
        'An Error occured when trying to create a new user',
      );
    }
  }
}

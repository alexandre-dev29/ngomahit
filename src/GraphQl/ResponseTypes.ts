import { Scalar } from '@nestjs/graphql';

@Scalar('LoginResponse')
export class LoginResponse {
  accessToken: string;
  refreshToken: string;
}

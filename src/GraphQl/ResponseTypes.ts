import { Scalar } from '@nestjs/graphql';

@Scalar('LoginResponse')
export class LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Scalar('MutationResponse')
export class MutationResponse {
  responseType: 'Success' | 'Error';
  message: string;
  data?: any;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  user_status: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  oldPassword: number;

  @Field(() => String)
  newPassword: number;
}

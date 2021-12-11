import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => Int)
  token_id: number;

  @Field(() => String)
  token: string;

  @Field(() => Int)
  user_id: number;
}

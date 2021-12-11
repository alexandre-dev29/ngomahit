import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const { user_id, email, username } =
      GqlExecutionContext.create(context).getContext().req.user;
    return { user_id, email, username };
  },
);

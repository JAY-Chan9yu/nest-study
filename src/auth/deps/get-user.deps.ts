import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';

// 디펜던시로 사용할 수 있다.
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

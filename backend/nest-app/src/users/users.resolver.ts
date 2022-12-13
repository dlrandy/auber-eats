import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import {
  LoginAccountInput,
  LoginAccountOutput,
} from './dtos/login-account.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query((returns) => Boolean)
  hi() {
    return true;
  }
  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      return await this.usersService.createAccount(createAccountInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  @Mutation((returns) => LoginAccountOutput)
  async loginAccount(
    @Args('input') loginAccountInput: LoginAccountInput,
  ): Promise<LoginAccountOutput> {
    try {
      return await this.usersService.loginAccount(loginAccountInput);
    } catch (error) {
      return {
        ok: false,
        error,
        token: '',
      };
    }
  }

  // TODO: 待优化
  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser /*@Context() context*/) {
    console.log(authUser);
    return authUser;
    // if (!context.user) {
    // } else {
    // }
    // return context.user;
  }
}

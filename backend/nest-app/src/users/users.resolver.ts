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
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import {
  EditUserProfileInput,
  EditUserProfileOutput,
} from './dtos/edit-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto';
import { Roles } from 'src/auth/roles.decorator';

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
  // @UseGuards(AuthGuard) 使用了全局的guard， 这里不再需要了
  @Roles([UserRole.Any])
  me(@AuthUser() authUser: User /*@Context() context*/) {
    console.log(authUser);
    return authUser;
    // if (!context.user) {
    // } else {
    // }
    // return context.user;
  }

  @Query((returns) => UserProfileOutput)
  @Roles([UserRole.Any])
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.usersService.findById(userProfileInput.userId);
      if (!user) {
        throw 'no user!';
      }
      return {
        ok: Boolean(user),
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  @Mutation((returns) => EditUserProfileOutput)
  @Roles([UserRole.Any])
  @UseGuards(AuthGuard)
  async editUserProfile(
    @AuthUser() authUser: User,
    @Args('input') userProfileInput: EditUserProfileInput,
  ): Promise<EditUserProfileOutput> {
    try {
      await this.usersService.editProfile(authUser.id, userProfileInput);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  @Mutation((returns) => VerifyEmailOutput)
  async verifyEmail(@Args('input') verifyEmailInput: VerifyEmailInput) {
    try {
      const ok = await this.usersService.verifyEmail(verifyEmailInput.code);
      const error = ok == false ? 'verify wrong,please try again' : null;
      return { ok, error };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

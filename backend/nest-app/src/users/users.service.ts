import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import {
  LoginAccountInput,
  LoginAccountOutput,
} from './dtos/login-account.dto';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.jwtService.hello();
  }
  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: 'email exists.' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'create user wromg.' };
    }
  }
  async loginAccount(
    loginAccountInput: LoginAccountInput,
  ): Promise<LoginAccountOutput> {
    try {
      const user = await this.users.findOneBy({
        email: loginAccountInput.email,
      });
      if (!user) {
        return {
          ok: false,
          error: 'user not exists or password wrong',
        };
      }
      const passwordIsCorrect = await user.checkPassword(
        loginAccountInput.password,
      );
      if (!passwordIsCorrect) {
        return {
          ok: false,
          error: 'user not exists or password wrong',
        };
      }
      const token = this.jwtService.sign({ id: user.id });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'user find wrong',
      };
    }
  }
  async findById(id: number) {
    return this.users.findOneBy({ id });
  }
}

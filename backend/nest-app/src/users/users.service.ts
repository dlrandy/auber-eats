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
import { EditUserProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    // this.jwtService.hello();
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
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      const verification = await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'create user wromg.' };
    }
  }
  async loginAccount(
    loginAccountInput: LoginAccountInput,
  ): Promise<LoginAccountOutput> {
    try {
      const user = await this.users.findOne({
        where: { email: loginAccountInput.email },
        select: ['id', 'password'],
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

  async editProfile(
    userId: number,
    editUserProfileInput: EditUserProfileInput,
  ): Promise<User> {
    const user = await this.users.findOneBy({ id: userId });
    for (const key in editUserProfileInput) {
      if (Object.prototype.hasOwnProperty.call(editUserProfileInput, key)) {
        const element = editUserProfileInput[key];
        user[key] = element;
      }
    }
    if (editUserProfileInput.email) {
      user.verified = false;
      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );
    }
    return this.users.save(user);
    // not trigger beforeUpdate
    // return this.users.update({ id: userId }, { ...editUserProfileInput });
  }

  async verifyEmail(code: string): Promise<boolean> {
    try {
      const verification = await this.verifications.findOne({
        where: { code },
        relations: ['user'],
        // loadRelationIds: true,
      });
      if (verification) {
        console.log('verification ', verification, verification.user);
        verification.user.verified = true;
        console.log('verification --', verification.user);
        await this.users.save(this.users.create(verification.user));
        await this.verifications.delete(verification.id);
        return true;
      }
      return false;
    } catch (error) {
      console.log('error ', error);
      return false;
    }
  }
}

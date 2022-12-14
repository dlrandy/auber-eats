import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { JwtModuleOptions } from './jwt.interface';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    /*Depencdency injection */
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions, // private readonly configService: ConfigService
  ) {}
  hello() {
    console.log('hello.');
  }
  sign(payload: object): string {
    return jwt.sign(
      payload,
      this.options.privateKey /*this.configService.get("TOKEN_SECRET") */,
    );
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}

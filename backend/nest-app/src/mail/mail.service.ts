import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { EmailVariables, MailModuleOptions } from './mail.interfaces';
// import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    /*Depencdency injection */
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions, // private readonly configService: ConfigService
  ) {
    this.sendEmail('testing', 'test');
  }
  private async sendEmail(
    subject: string,
    content: string,
    emailVars: EmailVariables[] = [
      {
        key: 'username',
        value: 'auber-eats1',
      },
      {
        key: 'confirmUrl',
        value: 'auber-eatsurl',
      },
    ],
    to = 'ziyucrc@gmail.com',
    template = 'auber-eats',
  ) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', to);
    form.append('subject', subject);
    form.append('text', content);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append('v:' + eVar.key, eVar.value));
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        method: 'POST',
        body: form,
      });
    } catch (error) {
      console.log('error ', error);
    }
  }
  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      'Verify Your Email',
      'verify email',
      [
        {
          key: 'username',
          value: email + ' user',
        },
        {
          key: 'confirmUrl',
          value: `http://localhost:4000/confirm?code=${code}`,
        },
      ],
      email,
    );
  }
}

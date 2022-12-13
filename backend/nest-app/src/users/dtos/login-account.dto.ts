import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CommonOutput } from '../../common/dtos/output.dto';

@InputType()
export class LoginAccountInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginAccountOutput extends CommonOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}

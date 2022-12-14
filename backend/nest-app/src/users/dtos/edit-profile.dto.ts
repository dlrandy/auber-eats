import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CommonOutput } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class EditUserProfileOutput extends CommonOutput {}

@InputType()
export class EditUserProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

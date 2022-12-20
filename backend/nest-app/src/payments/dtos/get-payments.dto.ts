import { Field, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { Payment } from '../entities/payment.entity';

@ObjectType()
export class GetPaymentsOutput extends CommonOutput {
  @Field((type) => [Payment], { nullable: true })
  payments?: Payment[];
}

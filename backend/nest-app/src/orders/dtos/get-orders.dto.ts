import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonOutput } from 'src/common/dtos/output.dto';
import { Order, OrderStatus } from '../entities/order.entity';

@InputType()
export class GetOrdersInput {
  @Field((type) => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class GetOrdersOutput extends CommonOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}

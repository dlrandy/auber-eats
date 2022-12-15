import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { Restaurant } from '../entities/restaurant.entity';
import { CommonOutput } from '../../common/dtos/output.dto';
@InputType()
export class RestaurantInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CommonOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}

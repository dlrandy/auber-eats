import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';

import { Restaurant } from '../entities/restaurant.entity';
import { CreateRestaurantDto } from './create-restaurant.dto';
// @InputType()
// export class UpdateRestaurantDto extends PartialType(Restaurant, InputType) {}
@InputType()
export class UpdateRestaurantInputType extends PartialType(
//   Restaurant,
  CreateRestaurantDto,
  InputType,
) {}
@ArgsType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;
  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}

import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
// import { IsBoolean, IsString, Length } from 'class-validator';
import { CommonOutput } from '../../common/dtos/output.dto';
import { CreateRestaurantInput } from './create-restaurant.dto';
@InputType()
export class DeleteRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CommonOutput {}

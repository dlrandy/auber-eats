import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
// import { IsBoolean, IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurant.entity';
import { CommonOutput } from '../../common/dtos/output.dto';
@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImage',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CommonOutput {}

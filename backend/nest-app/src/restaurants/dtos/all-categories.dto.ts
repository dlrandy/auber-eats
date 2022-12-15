import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
// import { IsBoolean, IsString, Length } from 'class-validator';
import { CommonOutput } from '../../common/dtos/output.dto';
import { Category } from '../entities/category.entity';
import { CreateRestaurantInput } from './create-restaurant.dto';
@InputType()
export class AllCategoriesInput extends PartialType(CreateRestaurantInput) {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class AllCategoriesOutput extends CommonOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}

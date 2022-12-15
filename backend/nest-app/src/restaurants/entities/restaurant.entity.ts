import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CommonEntity } from '../../common/entities/core.entity';
import { Category } from './category.entity';
import { User } from 'src/users/entities/user.entity';
@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CommonEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;
  @Field((type) => String)
  @Column()
  @IsString()
  address: string;
  @Field((type) => String)
  @Column()
  @IsString()
  coverImage: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;
}

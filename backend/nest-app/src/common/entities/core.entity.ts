import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CommonEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;
  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;
  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;
}

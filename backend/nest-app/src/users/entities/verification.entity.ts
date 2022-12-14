import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { IsString } from 'class-validator';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CommonEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  code: string;
  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
  @BeforeInsert()
  createCode(): void {
    this.code = Math.random().toString(10).substring(2, 6);
  }
}

import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsEnum, isString, IsString } from 'class-validator';
enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Column()
  @Field((type) => String)
  @IsString()
  password: string;
  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<any> {
    console.log('====================================');
    console.log('hahsssssssss', this.password);
    console.log('====================================');
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException('password hash error');
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (error) {
      throw new InternalServerErrorException('check password wrong');
    }
  }
}

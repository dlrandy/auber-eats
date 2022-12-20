import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CommonEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  isString,
  IsString,
} from 'class-validator';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
  Any = 'Any',
}

registerEnumType(UserRole, { name: 'UserRole' });
@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;
  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;
  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.customer)
  orders: Order[];

  @Field((type) => [Payment])
  @OneToMany((type) => Payment, (payment) => payment.user, { eager: true })
  payments: Payment[];
  @Field((type) => [Order])
  @OneToMany((type) => Order, (order) => order.driver)
  rides: number[];
  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<any> {
    try {
      // select: false alternative
      if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
      }
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

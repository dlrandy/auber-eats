import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Order } from './entities/order.entity';
import { CreateOrderOutput, CreateOrderInput } from './dtos/create-order.dto';
import { Roles } from 'src/auth/roles.decorator';
import { User, UserRole } from '../users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { OrdersService } from './orders.service';
import { EditOrderOutput, EditOrderInput } from './dtos/edit-order.dto';
import { GetOrderOutput, GetOrderInput } from './dtos/get-order.dto';
import { GetOrdersOutput, GetOrdersInput } from './dtos/get-orders.dto';

import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import {
  PUB_SUB,
  NEW_PENDING_ORDER,
  NEW_COOKED_ORDER,
} from 'src/common/common.constants';
import { TakeOrderInput, TakeOrderOutput } from './dtos/take-order.dto';
import { OrderUpdatesInput } from './dtos/order-updates.dto';
import { NEW_ORDER_UPDATE } from '../common/common.constants';

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject(PUB_SUB) private readonly pubsub: PubSub,
  ) {}

  @Mutation((returns) => CreateOrderOutput)
  @Roles([UserRole.Client])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input')
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      return this.ordersService.createOrder(customer, createOrderInput);
    } catch (error) {
      console.log('error ', error);
    }
  }

  @Query((returns) => GetOrdersOutput)
  @Roles([UserRole.Any])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.ordersService.getOrders(user, getOrdersInput);
  }

  @Query((returns) => GetOrderOutput)
  @Roles([UserRole.Any])
  async getOrder(
    @AuthUser() user: User,
    @Args('input') getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.ordersService.getOrder(user, getOrderInput);
  }

  @Mutation((returns) => EditOrderOutput)
  @Roles([UserRole.Any])
  async editOrder(
    @AuthUser() user: User,
    @Args('input') editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.ordersService.editOrder(user, editOrderInput);
  }

  @Mutation((returns) => Boolean)
  async pubsubReady(@Args('id') id: number) {
    await this.pubsub.publish('hellops', {
      helloSubPub: id,
    });
    return true;
  }
  // @Subscription((returns) => String, {
  //   filter: (payload, variables, context) => {
  //     return payload.helloSubPub == variables.id;
  //   },
  //   resolve: ({ helloSubPub }) => `awesome ${helloSubPub} is ready!`,
  // })
  // @Roles([UserRole.Any])
  // helloSubPub(@AuthUser() user, @Args('id') id: number) {
  //   return this.pubsub.asyncIterator('hellops');
  // }

  @Subscription((returns) => Order, {
    filter: ({ pendingOrders: { ownerId } }, _, { user }) => {
      return ownerId === user.id;
    },
    resolve: ({ pendingOrders: { order } }) => {
      return order;
    },
  })
  @Roles([UserRole.Owner])
  pendingOrders() {
    return this.pubsub.asyncIterator(NEW_PENDING_ORDER);
  }
  @Subscription((returns) => Order, {
    filter: ({ pendingOrders: { ownerId } }, _, { user }) => {
      return ownerId === user.id;
    },
    resolve: ({ pendingOrders: { order } }) => {
      return order;
    },
  })
  @Roles([UserRole.Delivery])
  cookedOrders() {
    return this.pubsub.asyncIterator(NEW_COOKED_ORDER);
  }

  @Subscription((returns) => Order, {
    filter: (
      { orderUpdates: order }: { orderUpdates: Order },
      { input }: { input: OrderUpdatesInput },
      { user }: { user: User },
    ) => {
      if (
        order.driverId !== user.id &&
        order.customerId !== user.id &&
        order.restaurant.ownerId !== user.id
      ) {
        return false;
      }
      return order.id === input.id;
    },
  })
  @Roles([UserRole.Any])
  orderUpdates(@Args('input') orderUpdatesInput: OrderUpdatesInput) {
    return this.pubsub.asyncIterator(NEW_ORDER_UPDATE);
  }

  @Mutation((returns) => TakeOrderOutput)
  @Roles([UserRole.Delivery])
  takeOrder(
    @AuthUser() driver: User,
    @Args('input') takeOrderInput: TakeOrderInput,
  ): Promise<TakeOrderOutput> {
    return this.ordersService.takeOrder(driver, takeOrderInput);
  }
}

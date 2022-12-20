import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Dish } from '../restaurants/entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Order, OrderItem, Dish])],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}

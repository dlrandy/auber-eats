import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentResolver } from './payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
  providers: [PaymentsService, PaymentResolver],
})
export class PaymentsModule {}

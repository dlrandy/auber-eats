import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User, UserRole } from 'src/users/entities/user.entity';
import {
  CreatePaymentInput,
  CreatePaymentOuput,
} from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Resolver((of) => Payment)
export class PaymentResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation((returns) => CreatePaymentOuput)
  @Roles([UserRole.Owner])
  async createPayment(
    @AuthUser() owner: User,
    @Args('input') createPaymentInput: CreatePaymentInput,
  ): Promise<CreatePaymentOuput> {
    return this.paymentsService.createPayment(owner, createPaymentInput);
  }

  @Query((returns) => GetPaymentsOutput)
  @Roles([UserRole.Owner])
  getPayments(@AuthUser() user: User): Promise<GetPaymentsOutput> {
    return this.paymentsService.getPayments(user);
  }
}

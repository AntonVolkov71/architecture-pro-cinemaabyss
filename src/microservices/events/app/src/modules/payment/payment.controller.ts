import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query,} from '@nestjs/common';
import {PaymentsCreateDto} from "../../type/payment.type";
import {PaymentService} from "./payment.service";
import {Routes} from "../../type/routes";

@Controller(Routes.PAYMENT)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {
  }

  @Get('/')
  public index(@Query('user_id') user_id?: number,) {
    console.info('Request: get payments', user_id)

    return this.paymentService.index(user_id);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() body: PaymentsCreateDto) {
    console.info('Request create payment', body)

    return this.paymentService.create(body);
  }
}

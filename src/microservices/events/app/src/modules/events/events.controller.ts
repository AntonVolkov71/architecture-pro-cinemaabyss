import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query,} from '@nestjs/common';
import {EventsService} from './events.service';
import {MockPaymentsCreateDto} from "../../mock/payments";

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {
  }

  @Get('/health')
  public health() {
    console.info('Request health')

    return this.eventService.health();
  }

  @Get('/payment')
  public getPayments(@Query('user_id') user_id?: number,) {
    console.info('Request getPayments', user_id)

    return this.eventService.getPayments(user_id);
  }

  @Post('/payment')
  @HttpCode(HttpStatus.CREATED)
  public createdPayment(@Body() body: MockPaymentsCreateDto) {
    console.info('Request payment', body)

    return this.eventService.createPayment(body);
  }
}

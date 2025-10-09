import {Injectable} from '@nestjs/common';
import {mockPayments, MockPaymentsCreateDto, MockPaymentsType} from "../../mock/payments";

@Injectable()
export class EventsService {
  private paymentId = 0;

  public async health() {
    return {status: true}
  }

  public async getPayments(user_id?: number) {
    if (user_id) {
      return mockPayments.filter(item => item.user_id === +user_id)
    }

    return mockPayments
  }

  public async createPayment(createDto: MockPaymentsCreateDto) {
    const id = ++this.paymentId

    const entity: MockPaymentsType = {
      id,
      ...createDto
    }

    mockPayments.push(entity)

    return {
      status: "success"
    };
  }
}

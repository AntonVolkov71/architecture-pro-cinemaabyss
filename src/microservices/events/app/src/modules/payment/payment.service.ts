import {Injectable} from "@nestjs/common";
import {PaymentsCreateDto, PaymentsType} from "../../type/payment.type";

@Injectable()
export class PaymentService {
  private payments: PaymentsType[] = []
  private paymentId = 0;

  public index(user_id?: number) {
    if (user_id) {
      return this.payments.filter(item => item.user_id === +user_id)
    }

    return this.payments;
  }

  public async create(createDto: PaymentsCreateDto) {
    const id = ++this.paymentId

    const entity: PaymentsType = {
      id,
      ...createDto
    }

    this.payments.push(entity)

    return {
      ...entity,
      status: "success"
    };
  }
}

import {Injectable} from "@nestjs/common";
import {PaymentsCreateDto, PaymentsType} from "../../type/payment.type";
import {KafkaProducerService} from "../kafka/kafka_producer.service";
import {ContactEvent} from "../../assets/contract";

@Injectable()
export class PaymentService {
  private payments: PaymentsType[] = []
  private paymentId = 0;

  constructor(
    private readonly kafkaProducerService: KafkaProducerService
  ) {
  }

  public async index(user_id?: number) {
    const message = {
      command: "index",
      user_id: Number(user_id)
    }

    await this.kafkaProducerService.sendMessage(ContactEvent.PAYMENT_EVENTS, JSON.stringify(message))

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

    const message = {
      command: "create",
      data: entity
    }

    await this.kafkaProducerService.sendMessage(ContactEvent.PAYMENT_EVENTS, JSON.stringify(message))

    return {
      ...entity,
      status: "success"
    };
  }
}

import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern} from "@nestjs/microservices";
import {ContactEvent} from "../../assets/contract";

@Controller()
export class PaymentKafkaController {
  @MessagePattern(ContactEvent.PAYMENT_EVENTS)
  consumePaymentEvent(@Ctx() context: KafkaContext) {
    try {
      const originalMessage = context.getMessage();
      const value = originalMessage.value?.toString();
      const parseValue = JSON.parse(JSON.parse(value as string || '{}'));

      console.info('Payment consumer ', ContactEvent.PAYMENT_EVENTS, parseValue)

      return {
        "status": "success"
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("PaymentKafkaController", e.message)
      }

      return {
        "status": "error"
      }
    }
  }
}

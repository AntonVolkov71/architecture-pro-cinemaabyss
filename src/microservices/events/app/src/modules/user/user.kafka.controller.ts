import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern} from "@nestjs/microservices";
import {ContactEvent} from "../../assets/contract";

@Controller()
export class UserKafkaController {

  @MessagePattern(ContactEvent.USER_EVENTS)
  consumeUserEvent(@Ctx() context: KafkaContext) {
    try {
      const originalMessage = context.getMessage();
      const value = originalMessage.value?.toString();
      const parseValue = JSON.parse(JSON.parse(value as string || '{}'));

      console.info('User consumer', ContactEvent.USER_EVENTS, parseValue)

      return {
        "status": "success"
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("UserKafkaController", e.message)
      }

      return {
        "status": "error"
      }
    }
  }
}

import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern} from "@nestjs/microservices";

@Controller()
export class UserKafkaController {

  @MessagePattern('user-events')
  consumeUserEvent(@Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const value = originalMessage.value?.toString();
    try {
      const parseValue = JSON.parse(value || '{}')

      console.info('UserKafka ', parseValue)

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

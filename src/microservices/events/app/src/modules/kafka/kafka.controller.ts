import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class KafkaController {
  // @MessagePattern('movie-events')
  // consumeMovieEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
  //   const originalMessage = context.getMessage();
  //   const value = originalMessage.value?.toString();
  //   console.info('movie-events', message)
  //   console.info('value', value)
  // }

  @MessagePattern('user-events')
  consumeUserEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const value = originalMessage.value?.toString();
    console.log('message', message)
    console.log('value', value)
  }
}

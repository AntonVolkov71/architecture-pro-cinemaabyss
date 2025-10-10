import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern} from "@nestjs/microservices";

@Controller()
export class MovieKafkaController {
  @MessagePattern('movie-events')
  consumeMovieEvent(@Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const value = originalMessage.value?.toString();
    try {
      const parseValue = JSON.parse(value || '{}')

      console.info('MovieKafka ', parseValue)
    } catch (e) {
      if (e instanceof Error) {
        console.error("MovieKafkaController", e.message)
      }
    }
  }
}

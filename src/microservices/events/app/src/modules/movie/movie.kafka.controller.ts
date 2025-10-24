import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern} from "@nestjs/microservices";
import {ContactEvent} from "../../assets/contract";

@Controller()
export class MovieKafkaController {
  @MessagePattern(ContactEvent.MOVIE_EVENTS)
  consumeMovieEvent(@Ctx() context: KafkaContext) {
    try {
      const originalMessage = context.getMessage();
      const value = originalMessage.value?.toString();
      const parseValue = JSON.parse(JSON.parse(value as string || '{}'));

      console.info('Movie consumer', ContactEvent.MOVIE_EVENTS, parseValue)

      return {
        "status": "success"
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error("MovieKafkaController", e.message)
      }

      return {
        "status": "error"
      }
    }
  }
}

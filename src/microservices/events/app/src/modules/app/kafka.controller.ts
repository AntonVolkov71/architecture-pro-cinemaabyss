import {Controller} from "@nestjs/common";
import {Ctx, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class HeroesController {
  @MessagePattern('movie-events')
  killDragon(@Payload() message: any): any {

    console.log('message', message)
    // const dragonId = message.dragonId;
    // const items = [
    //   {id: 1, name: 'Mythical Sword'},
    //   {id: 2, name: 'Key to Dungeon'},
    // ];
    return "sss";
  }

  @MessagePattern('movie-event')
  k2illDragon(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('message', message)
    console.log(`Topic: ${context.getTopic()}`);
  }
}

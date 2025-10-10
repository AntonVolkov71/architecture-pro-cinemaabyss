import {Module} from "@nestjs/common";
import {MovieService} from "./movie.service";
import {MovieController} from "./movie.controller";
import {MovieKafkaController} from "./movie.kafka.controller";
import {KafkaModule} from "../kafka/kafka.module";

@Module({
  imports: [KafkaModule],
  controllers: [MovieController, MovieKafkaController],
  providers: [MovieService],
  exports: [MovieService],
})

export class MovieModule {
}

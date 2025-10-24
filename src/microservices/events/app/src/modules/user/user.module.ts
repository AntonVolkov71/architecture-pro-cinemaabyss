import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {UserKafkaController} from "./user.kafka.controller";
import {KafkaModule} from "../kafka/kafka.module";

@Module({
  imports: [KafkaModule],
  controllers: [UserController, UserKafkaController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {
}

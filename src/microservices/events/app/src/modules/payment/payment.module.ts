import {Module} from "@nestjs/common";
import {PaymentService} from "./payment.service";
import {PaymentController} from "./payment.controller";
import {KafkaModule} from "../kafka/kafka.module";
import {PaymentKafkaController} from "./payment.kafka.controller";

@Module({
  imports: [KafkaModule],
  controllers: [PaymentController, PaymentKafkaController],
  providers: [PaymentService],
  exports: [PaymentService],
})

export class PaymentModule {
}

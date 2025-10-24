import {Logger, Module, OnModuleInit} from "@nestjs/common";
import {KafkaController} from "./kafka.controller";
import {KafkaProducerService} from "./kafka_producer.service";
import {Kafka} from "kafkajs";
import {ConfigService} from "@nestjs/config";

@Module({
  providers: [
    {
    provide: 'KAFKA_CLIENT',
    useFactory: (configService: ConfigService) => {
      const kafkaBrokers = configService.get("broker.kafkaBrokers");

      return new Kafka({
        clientId: 'nestjs-producer',
        brokers: [kafkaBrokers],
        retry: {
          retries: 5,
          initialRetryTime: 1000,
          maxRetryTime: 30000,
        },
      });
    },

    inject: [ConfigService],
    },
    KafkaProducerService,
    Logger
  ],
  controllers: [KafkaController],
  exports: [KafkaProducerService]
})
export class KafkaModule implements OnModuleInit {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {
  }

  async onModuleInit() {
    await this.kafkaProducerService.onModuleInit();
  }
}

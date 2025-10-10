import {Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {Kafka, Producer, ProducerRecord} from "kafkajs";

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);

  private producer: Producer;

  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafka: Kafka,
  ) {
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000,
    });
  }

  async onModuleInit() {
    await this.producer.connect()
    console.info('KafkaProducerService connected',)
  }

  async onModuleDestroy() {
    await this.producer.disconnect()

  }

  async sendMessage(topic: string, message: any, key?: string) {
    try {
      const record: ProducerRecord = {
        topic,
        messages: [
          {
            key: key || null,
            value: JSON.stringify(message),
            headers: {
              'content-type': 'application/json',
              'timestamp': new Date().toISOString(),
            },
          },
        ],
      };

      const result = await this.producer.send(record);
      this.logger.log(`Message sent to topic ${topic}: ${JSON.stringify(message)}`);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

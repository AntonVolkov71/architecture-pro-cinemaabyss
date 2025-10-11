import {Inject, Injectable} from "@nestjs/common";
import {Kafka, Partitioners, Producer, ProducerRecord} from "kafkajs";

@Injectable()
export class KafkaProducerService {
  private producer: Producer;

  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafka: Kafka,
  ) {
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000,
      createPartitioner: Partitioners.LegacyPartitioner
    });
  }

  async onModuleInit() {
    await this.producer.connect()
  }

  async sendMessage(topic: string, message: any, key?: string) {
    console.info('Kafka producer send:', topic)

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

      return await this.producer.send(record);
    } catch (error) {
      throw error;
    }
  }
}

import {Injectable} from '@nestjs/common';
import {Client, Transport} from "@nestjs/microservices";
import {ClientKafkaProxy} from "@nestjs/microservices/interfaces/client-kafka-proxy.interface";

@Injectable()
export class AppService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'hero',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'movie-events'
      }
    }
  })
  client: ClientKafkaProxy;

  async onModuleInit() {
    console.log('in module init',)
    // this.client.subscribeToResponseOf('hero.kill.dragon');
    this.client.subscribeToResponseOf('movie-events');
    // await this.client.connect();
  }

  // запуск сервисов перед запуском
  async startServicesBeforeStart(): Promise<void> {
    console.info('startServicesBeforeStart');
  }
}

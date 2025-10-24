import {Injectable} from '@nestjs/common';

@Injectable()
export class BrokerConfigService {
  kafkaBrokers(): string {
    return process['env']['KAFKA_BROKERS'] ? process['env']['KAFKA_BROKERS'] : 'localhost:29092';
  }
}

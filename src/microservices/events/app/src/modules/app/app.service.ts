import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  // запуск сервисов перед запуском
  async startServicesBeforeStart(): Promise<void> {
    console.info('startServicesBeforeStart');
  }
}

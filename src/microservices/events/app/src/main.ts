import {NestFactory} from '@nestjs/core';
import {AppModule} from './modules/app/app.module';
import {Logger} from '@nestjs/common';
import {AllExceptionFilter} from './common/filters/allExceptionFilter';
import {AppConfigService} from './configuration/app/config.service';
import {NestExpressApplication} from '@nestjs/platform-express';
import {Routes} from "./type/routes";
import {Transport} from "@nestjs/microservices";
import {BrokerConfigService} from "./configuration/broker/config.service";

async function bootstrap() {
  // Создание сервера
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix(Routes.API + Routes.EVENTS);
  app.useGlobalFilters(new AllExceptionFilter());

  const brokerConfig: BrokerConfigService = app.get(BrokerConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [brokerConfig.kafkaBrokers()],
        retry: {
          retries: 5,
          initialRetryTime: 1000,
        }
      },
      consumer: {
        groupId: 'events',
        sessionTimeout: 30000,
        heartbeatInterval: 10000,
        rebalanceTimeout: 60000,
        maxWaitTimeInMs: 5000,
        retry: {
          retries: 5,
          initialRetryTime: 1000,
        }
      },
      subscribe: {
        fromBeginning: true,
      },
      run: {
        autoCommit: true,
      }
    },
  });

  // Получение данных из конфига
  const appConfig: AppConfigService = app.get(AppConfigService);
  const PORT = appConfig.portApplication();
  const nameApplication = appConfig.nameApplication();
  const logger = new Logger(nameApplication);

  await app.startAllMicroservices();

  // Запуск сервера
  app
    .listen(PORT, () =>
      logger.log(`[EVENTS SERVICE] App has started ${PORT}`, 'bootstrap')
    )
    .catch((e) => logger.error(e.message, 'bootstrap'));
}

bootstrap();

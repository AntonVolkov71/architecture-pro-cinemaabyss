import {Module, OnApplicationBootstrap, UseFilters} from '@nestjs/common';
import {AppService} from './app.service';
import {AppConfigModule} from '../../configuration/app/config.module';
import {ConfigModuleForApp} from '../../utils/connected';
import {AllExceptionFilter} from '../../common/filters/allExceptionFilter';
import {PaymentModule} from "../payment/payment.module";
import {MovieModule} from "../movie/movie.module";
import {UserModule} from "../user/user.module";
import {AppController} from "./app.controller";
import {BrokerConfigModule} from "../../configuration/broker/config.module";
import {KafkaModule} from "../kafka/kafka.module";

@UseFilters(AllExceptionFilter)
@Module({
  imports: [
    AppConfigModule,
    BrokerConfigModule,
    ConfigModuleForApp,
    PaymentModule,
    MovieModule,
    UserModule,
    KafkaModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.appService.startServicesBeforeStart();
  }
}

import {Module, OnApplicationBootstrap, UseFilters} from '@nestjs/common';
import {AppService} from './app.service';
import {AppConfigModule} from '../../configuration/app/config.module';
import {ConfigModuleForApp} from '../../utils/connected';
import {AllExceptionFilter} from '../../common/filters/allExceptionFilter';
import {PaymentModule} from "../payment/payment.module";
import {MovieModule} from "../movie/movie.module";
import {UserModule} from "../user/user.module";
import {AppController} from "./app.controller";
import {HeroesController} from "./kafka.controller";

@UseFilters(AllExceptionFilter)
@Module({
  imports: [
    AppConfigModule,
    ConfigModuleForApp,
    // V1Module,
    PaymentModule,
    MovieModule,
    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController, HeroesController],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.appService.startServicesBeforeStart();
  }
}

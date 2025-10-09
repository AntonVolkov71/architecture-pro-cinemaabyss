import {Module, OnApplicationBootstrap, UseFilters} from '@nestjs/common';
import {AppService} from './app.service';
import {AppConfigModule} from '../../configuration/app/config.module';
import {ConfigModuleForApp} from '../../utils/connected';
import {AllExceptionFilter} from '../../common/filters/allExceptionFilter';
import {V1Module} from '../api/v1/v1.module';
import {EventsModule} from "../events/events.module";

@UseFilters(AllExceptionFilter)
@Module({
  imports: [
    AppConfigModule,
    ConfigModuleForApp,
    V1Module,
    EventsModule,
  ],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.appService.startServicesBeforeStart();
  }
}

import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from './configuration';
import {BrokerConfigService} from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],

  providers: [ConfigService, BrokerConfigService],
  exports: [BrokerConfigService],
})
export class BrokerConfigModule {
}

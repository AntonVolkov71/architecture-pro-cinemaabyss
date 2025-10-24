import {ConfigModule} from '@nestjs/config';
import configurationApp from '../configuration/app/configuration';
import configurationBroker from '../configuration/broker/configuration';

export const ConfigModuleForApp = ConfigModule.forRoot({
  load: [configurationApp, configurationBroker],
  isGlobal: true,
});


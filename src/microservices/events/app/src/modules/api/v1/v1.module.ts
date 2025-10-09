import {Module} from '@nestjs/common';
import {RouterModule} from '@nestjs/core';
import {EventsModule} from "../../events/events.module";

@Module({
  imports: [
    EventsModule,
    RouterModule.register([
      {path: 'api', module: EventsModule}
    ])
  ]
})
export class V1Module {
}

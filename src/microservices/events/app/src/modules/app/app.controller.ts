import {Controller, Get} from "@nestjs/common";
import {Routes} from "../../type/routes";

@Controller(Routes.HEALTH)
export class AppController {

  @Get('/')
  public health() {
    console.info('Request:', Routes.HEALTH)

    return {
      status: true
    }
  }
}

import {Body, Controller, HttpCode, HttpStatus, Post,} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCreateDto} from "../../type/user.type";
import {Routes} from "../../type/routes";

@Controller(Routes.USER)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() body: UserCreateDto) {
    console.info('HTTP:', Routes.USER, body)

    return this.userService.create(body);
  }
}

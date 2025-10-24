import {Body, Controller, HttpCode, HttpStatus, Post,} from '@nestjs/common';
import {MovieService} from "./movie.service";
import {MovieCreateDto} from "../../type/movie.type";
import {Routes} from "../../type/routes";

@Controller(Routes.MOVIE)
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() body: MovieCreateDto) {
    console.info('HTTP:', Routes.MOVIE, body);

    return this.movieService.create(body);
  }
}

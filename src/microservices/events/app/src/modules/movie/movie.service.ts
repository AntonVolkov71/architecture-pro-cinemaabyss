import {Injectable} from "@nestjs/common";
import {MovieCreateDto, MoviesType} from "../../type/movie.type";

@Injectable()
export class MovieService {
  private movies: MoviesType[] = []
  private movieId = 0;

  public async create(createDto: MovieCreateDto) {
    const id = ++this.movieId

    const entity: MoviesType = {
      id,
      ...createDto
    }

    this.movies.push(entity)

    return {
      ...entity,
      status: "success"
    };
  }
}

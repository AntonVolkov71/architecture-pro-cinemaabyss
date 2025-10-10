import {Injectable} from "@nestjs/common";
import {MovieCreateDto, MoviesType} from "../../type/movie.type";
import {KafkaProducerService} from "../kafka/kafka_producer.service";

@Injectable()
export class MovieService {
  private movies: MoviesType[] = []
  private movieId = 0;

  constructor(
    private readonly kafkaProducerService: KafkaProducerService
  ) {
  }

  public async create(createDto: MovieCreateDto) {
    const id = ++this.movieId

    const entity: MoviesType = {
      id,
      ...createDto
    }

    this.movies.push(entity)

    const message = {
      command: "create",
      data: entity
    }

    await this.kafkaProducerService.sendMessage("movie-events", JSON.stringify(message))

    return {
      ...entity,
      status: "success"
    };
  }
}

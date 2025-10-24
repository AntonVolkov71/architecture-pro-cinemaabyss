import {Injectable} from "@nestjs/common";
import {UserCreateDto, UserType} from "../../type/user.type";
import {KafkaProducerService} from "../kafka/kafka_producer.service";
import {ContactEvent} from "../../assets/contract";

@Injectable()
export class UserService {
  private users: UserType[] = []
  private userId = 0;

  constructor(
    private readonly kafkaProducerService: KafkaProducerService
  ) {
  }

  public async create(createDto: UserCreateDto) {
    const id = ++this.userId

    const entity: UserType = {
      id,
      ...createDto
    }

    this.users.push(entity)
    const message = {
      command: "create",
      data: entity
    }

    await this.kafkaProducerService.sendMessage(ContactEvent.USER_EVENTS, JSON.stringify(message))

    return {
      ...entity,
      status: "success"
    };
  }
}

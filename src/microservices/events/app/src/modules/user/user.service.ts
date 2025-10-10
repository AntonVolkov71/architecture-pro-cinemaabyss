import {Injectable} from "@nestjs/common";
import {UserCreateDto, UserType} from "../../type/user.type";

@Injectable()
export class UserService {
  private users: UserType[] = []
  private userId = 0;


  public async create(createDto: UserCreateDto) {
    const id = ++this.userId

    const entity: UserType = {
      id,
      ...createDto
    }

    this.users.push(entity)

    return {
      ...entity,
      status: "success"
    };
  }
}

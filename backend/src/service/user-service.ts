import { UserRepository } from "../data/repository/user-repository";
import { UserRegisterDTO } from "../dto/user-dto";

export class UserService{
    private userRepository = new UserRepository();
}


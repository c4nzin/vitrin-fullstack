import { SearchUserDto } from '../dto';

export class SearchUserCommand {
  constructor(public userInput: SearchUserDto) {}
}

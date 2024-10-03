import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}
}

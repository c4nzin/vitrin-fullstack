import { UpdateProfileDto } from 'src/features/user/dto';

export class UpdateProfileFieldsCommand {
  constructor(
    public readonly id: string,
    public updateProfileDto: UpdateProfileDto,
  ) {}
}

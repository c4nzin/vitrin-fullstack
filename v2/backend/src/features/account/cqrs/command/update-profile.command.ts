import { UpdateProfileDto } from '../../dto/update-profile.dto';

export class UpdateProfileFieldsCommand {
  constructor(
    public readonly id: string,
    public updateProfileDto: UpdateProfileDto,
  ) {}
}

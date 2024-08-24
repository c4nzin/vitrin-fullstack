import { UpdateProfileDto } from 'src/features/user/dto';
export declare class UpdateProfileFieldsCommand {
    readonly id: string;
    updateProfileDto: UpdateProfileDto;
    constructor(id: string, updateProfileDto: UpdateProfileDto);
}

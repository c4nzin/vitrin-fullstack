import { UserDocument } from '../schemas';
import { CommandBus } from '@nestjs/cqrs';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
export declare class FollowController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    follow(user: UserDocument, id: string): Promise<UserDocument>;
    unfollow(user: UserDocument, id: string): Promise<UserDocument>;
    getFollowers(id: string, pagination: Pagination): Promise<any>;
}

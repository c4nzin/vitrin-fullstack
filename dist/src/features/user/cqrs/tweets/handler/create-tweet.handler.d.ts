import { ICommandHandler } from '@nestjs/cqrs';
import { CreateTweetCommand } from '../command/create-tweet.command';
import { PostRepository } from 'src/features/user/repositories';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { PostDocument } from 'src/features/user/schemas';
export declare class CreateTweetCommandHandler implements ICommandHandler<CreateTweetCommand> {
    private readonly postRepository;
    private readonly cloudinaryService;
    constructor(postRepository: PostRepository, cloudinaryService: CloudinaryService);
    execute(command: CreateTweetCommand): Promise<PostDocument>;
    private uploadMedia;
}

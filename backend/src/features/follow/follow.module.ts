import { forwardRef, Module } from '@nestjs/common';
import { FetchFollowersHandler } from './cqrs/handler/fetch-followers.handler';
import { FollowCommandHandler } from './cqrs/handler/follow.handler';
import { UnfollowCommandHandler } from './cqrs/handler/unfollow.handler';
import { FollowController } from './controllers/follow.controller';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';

@Module({
  imports: [forwardRef(() => UserModule), CqrsModule, WebsocketModule],
  controllers: [FollowController],
  providers: [FetchFollowersHandler, FollowCommandHandler, UnfollowCommandHandler],
  exports: [],
})
export class FollowModule {}

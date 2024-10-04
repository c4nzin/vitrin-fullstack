import { forwardRef, Module } from '@nestjs/common';
import { FollowController } from './controllers/follow.controller';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';
import { allFollowHandlers } from './handler/all-follow.handlers';

@Module({
  imports: [forwardRef(() => UserModule), CqrsModule, WebsocketModule],
  controllers: [FollowController],
  providers: [...allFollowHandlers],
  exports: [...allFollowHandlers],
})
export class FollowModule {}

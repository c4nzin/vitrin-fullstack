import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { OtpModule } from './otp/otp.module';
import { PostModule } from './posts/post.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { FriendModule } from './friend/friend.module';
import { ExploreModule } from './explore/explore.module';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    FollowModule,
    MessageModule,
    NotificationModule,
    OtpModule,
    PostModule,
    UserModule,
    ConversationModule,
    MessageModule,
    FriendModule,
    ExploreModule,
  ],
})
export class FeaturesModule {}

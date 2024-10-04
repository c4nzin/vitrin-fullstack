import { CreateTweetCommandHandler } from './create-tweet.handler';
import { DeleteTweetCommandHandler } from './delete-tweet.handler';
import { FetchTweetsCommandHandler } from './fetch-tweets.handler';
import { LikeTweetCommandHandler } from './like-tweet.handler';
import { UnlikeTweetCommandHandler } from './unlike-tweet.handler';

export const allPostsHandler = [
  CreateTweetCommandHandler,
  DeleteTweetCommandHandler,
  FetchTweetsCommandHandler,
  LikeTweetCommandHandler,
  UnlikeTweetCommandHandler,
];
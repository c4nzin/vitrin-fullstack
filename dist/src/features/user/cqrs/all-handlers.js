"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allHandlers = void 0;
const update_email_handler_1 = require("./account/handler/update-email.handler");
const update_profile_handler_1 = require("./account/handler/update-profile.handler");
const upload_photo_handler_1 = require("./photo/handler/upload-photo.handler");
const fetch_followers_handler_1 = require("./follow/handler/fetch-followers.handler");
const follow_handler_1 = require("./follow/handler/follow.handler");
const unfollow_handler_1 = require("./follow/handler/unfollow.handler");
const create_tweet_handler_1 = require("./tweets/handler/create-tweet.handler");
const delete_tweet_handler_1 = require("./tweets/handler/delete-tweet.handler");
const fetch_tweets_handler_1 = require("./tweets/handler/fetch-tweets.handler");
const like_tweet_handler_1 = require("./tweets/handler/like-tweet.handler");
exports.allHandlers = [
    update_email_handler_1.UpdateEmailCommandHandler,
    update_profile_handler_1.UpdateProfileFieldsCommandHandler,
    update_email_handler_1.UpdateEmailCommandHandler,
    fetch_followers_handler_1.FetchFollowersHandler,
    follow_handler_1.FollowCommandHandler,
    unfollow_handler_1.UnfollowCommandHandler,
    upload_photo_handler_1.UploadPhotoCommandHandler,
    create_tweet_handler_1.CreateTweetCommandHandler,
    delete_tweet_handler_1.DeleteTweetCommandHandler,
    fetch_tweets_handler_1.FetchTweetsCommandHandler,
    like_tweet_handler_1.LikeTweetCommandHandler,
];
//# sourceMappingURL=all-handlers.js.map
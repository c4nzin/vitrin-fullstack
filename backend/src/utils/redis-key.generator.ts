import { Injectable } from '@nestjs/common';

type RedisKey<T extends string, P extends string> = `${Lowercase<T>}:${Lowercase<P>}`;

//not using rn.
type ConvertToRedisObjectsWithPrefix<
  T extends string,
  P extends ReadonlyArray<string>,
> = {
  [K in Lowercase<T>]: `${Lowercase<T>}:${Lowercase<P[number]>}`;
};

@Injectable()
export class RedisKeyManager {
  constructor() {}

  public createRedisKey<T extends string, P extends string>(key: RedisKey<T, P>): string {
    return key as RedisKey<T, P>;
  }
}

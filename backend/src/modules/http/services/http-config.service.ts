import { Inject, Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Config, ENV } from 'src/config/config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.config.HTTP_TIMEOUT,
      maxRedirects: this.config.MAX_REDIRECTS,
    };
  }
}

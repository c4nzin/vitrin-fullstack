import { Global, Module } from '@nestjs/common';
import { HttpModule as RootHttpModule } from '@nestjs/axios';
import { HttpConfigService } from './services/http-config.service';

@Global()
@Module({
  imports: [RootHttpModule.registerAsync({ useClass: HttpConfigService })],
  exports: [RootHttpModule],
})
export class HttpModule {}

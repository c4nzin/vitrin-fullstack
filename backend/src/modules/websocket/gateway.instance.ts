import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class GatewayInstance {
  private logger = new Logger(GatewayInstance.name);
  private _server: Server;

  public set server(server: Server) {
    this.logger.log('Global io server initalized.');
    this._server = server;
  }

  public get server(): Server {
    return this._server;
  }
}

import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class GatewayInstance {
  private _server: Server;

  public set server(server: Server) {
    this._server = server;
  }

  public get server(): Server {
    return this._server;
  }
}

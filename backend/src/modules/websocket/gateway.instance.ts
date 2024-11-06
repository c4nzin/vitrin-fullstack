import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class GatewayInstance {
  public server: Server;
  constructor() {
    this.server = new Server();
  }
}

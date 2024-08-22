import { Strategy } from 'passport-local';
import { CommandBus } from '@nestjs/cqrs';
import { Mapper } from '@automapper/core';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly commandBus;
    private readonly mapper;
    constructor(commandBus: CommandBus, mapper: Mapper);
    validate(username: string, password: string): Promise<any>;
}
export {};

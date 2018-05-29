import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthorizationController } from './authorization.controller';
import { TypeOrmUserCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-user.command.repository';
import { TypeOrmUserQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-user.query.repository';
import { SignUpExecute } from '../../../application/command/authorization/sign-up.execute';
import { StoreUserHandler } from '../../../application/event/user/store-user.handler';
import { SignInExecute } from '../../../application/command/authorization/sign-in.execute';

@Module({
    imports: [CQRSModule],
    controllers: [AuthorizationController],
    providers: [
        {
            provide: 'UserCommandRepository',
            useClass: TypeOrmUserCommandRepository
        },
        {
            provide: 'UserQueryRepository',
            useClass: TypeOrmUserQueryRepository
        },
        /**
         * Command
         */
        SignUpExecute,
        /**
         * Query
         */
        SignInExecute,
        /**
         * Event
         */
        StoreUserHandler
    ],
})
export class AuthorizationModule implements OnModuleInit {

    /**
     * @param {ModuleRef} moduleRef
     * @param {CommandBus} command$
     * @param {EventBus} event$
     */
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly event$: EventBus) {
    }

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);
        this.event$.setModuleRef(this.moduleRef);

        this.command$.register([
            SignUpExecute,
            SignInExecute
        ]);
        
        this.event$.register([
            StoreUserHandler
        ]);
    }
}
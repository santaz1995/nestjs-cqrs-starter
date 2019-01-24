import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthorizationController } from './authorization.controller';
import { TypeOrmUserCommandRepository } from '../user/repository/type-orm/type-orm-user.command.repository';
import { TypeOrmUserQueryRepository } from '../user/repository/type-orm/type-orm-user.query.repository';
import { SignUpExecute } from './application/commands/sign-up.execute';
import { SignInExecute } from './application/commands/sign-in.execute';
import { JwtStrategy } from '../../utils/jwt/jwt.strategy';
import { StoreUserHandler } from '../user/application/events/store-user.handler';

@Module({
    imports: [
        CQRSModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secretOrPrivateKey: '123',
            signOptions: {
                expiresIn: 36000,
            },
        }),
    ],
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
        StoreUserHandler,

        JwtStrategy
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
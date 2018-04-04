import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FeedbackController } from './feedback.controller';
import { TypeOrmFeedbackCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-feedback.command.repository';
import { TypeOrmFeedbackQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-feedback.query.repository';
import { EventFeedbackHandler } from '../../../application/event/feedback';
import { CommandFeedbackHandler } from '../../../application/command/feedback';

@Module({
    modules: [CQRSModule],
    controllers: [FeedbackController],
    components: [
        {
            provide: 'FeedbackCommandRepository',
            useClass: TypeOrmFeedbackCommandRepository
        },
        {
            provide: 'FeedbackQueryRepository',
            useClass: TypeOrmFeedbackQueryRepository
        },
        ...CommandFeedbackHandler,
        ...EventFeedbackHandler
    ],
})
export class FeedbackModule implements OnModuleInit {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly event$: EventBus,
    ) {
    }

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);
        this.event$.setModuleRef(this.moduleRef);

        this.command$.register(CommandFeedbackHandler);
        this.event$.register(EventFeedbackHandler);
    }
}
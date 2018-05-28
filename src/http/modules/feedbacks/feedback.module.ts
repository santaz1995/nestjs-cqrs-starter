import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FeedbackController } from './feedback.controller';
import { TypeOrmFeedbackCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-feedback.command.repository';
import { TypeOrmFeedbackQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-feedback.query.repository';
import { CreateFeedbackExecute } from '../../../application/command/feedback/create-feedback.execute';
import { GetFeedbacksExecute } from '../../../application/query/feedback/get-feedbacks.execute';
import { StoreFeedbackHandler } from '../../../application/event/feedback/store-feedback.handler';
import { GetByIdFeedbackExecute } from '../../../application/query/feedback/get-by-id-feedback.execute';

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
        CreateFeedbackExecute,
        GetFeedbacksExecute,
        GetByIdFeedbackExecute,
        StoreFeedbackHandler
    ],
})
export class FeedbackModule implements OnModuleInit {

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

        this.command$.register([CreateFeedbackExecute, GetFeedbacksExecute, GetByIdFeedbackExecute]);
        
        this.event$.register([StoreFeedbackHandler]);
    }
}
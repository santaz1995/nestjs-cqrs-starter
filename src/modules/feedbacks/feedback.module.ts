import { CommandBus, EventBus, CQRSModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FeedbackController } from './feedback.controller';
import { GetFeedbacksExecute } from './application/queries/get-feedbacks.execute';
import { GetByIdFeedbackExecute } from './application/queries/get-by-id-feedback.execute';
import { StoreFeedbackHandler } from './application/events/store-feedback.handler';
import { TypeOrmFeedbackCommandRepository } from './repository/type-orm/type-orm-feedback.command.repository';
import { TypeOrmFeedbackQueryRepository } from './repository/type-orm/type-orm-feedback.query.repository';
import { CreateFeedbackExecute } from './application/commands/create-feedback.execute';

@Module({
    imports: [CQRSModule],
    controllers: [FeedbackController],
    providers: [
        {
            provide: 'FeedbackCommandRepository',
            useClass: TypeOrmFeedbackCommandRepository,
        },
        {
            provide: 'FeedbackQueryRepository',
            useClass: TypeOrmFeedbackQueryRepository,
        },
        /**
         * Command
         */
        CreateFeedbackExecute,
        /**
         * Query
         */
        GetFeedbacksExecute,
        GetByIdFeedbackExecute,
        /**
         * Event
         */
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

        this.command$.register([
            CreateFeedbackExecute,
            GetFeedbacksExecute,
            GetByIdFeedbackExecute
        ]);
        this.event$.register([
            StoreFeedbackHandler
        ]);
    }
}
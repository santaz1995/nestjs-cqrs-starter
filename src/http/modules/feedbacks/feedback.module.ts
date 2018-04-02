import { CommandBus, CQRSModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FeedbackController } from './feedback.controller';
import { CreateFeedbackHandler } from '../../../application/command/handlers/create-feedback.handler';
import { TypeOrmFeedbackRepository } from '../../../infrastructures/domain/typeorm/type-orm-feedback.repository';

@Module({
    modules: [CQRSModule],
    controllers: [FeedbackController],
    components: [
        CreateFeedbackHandler,
        {
            provide: 'FeedbackRepository',
            useClass: TypeOrmFeedbackRepository
        }
    ],
})
export class FeedbackModule implements OnModuleInit {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
    ) {
    }

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);

        this.command$.register([
            CreateFeedbackHandler
        ]);
    }
}
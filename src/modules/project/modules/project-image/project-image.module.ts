import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectImageController } from './project-image.controller';
import { TypeOrmProjectImageCommandRepository } from './repository/type-orm/type-orm-project-image.command.repository';
import { TypeOrmProjectImageQueryRepository } from './repository/type-orm/type-orm-project-image.query.repository';
import { CreateProjectImageExecute } from './application/commands/create-project-image.execute';
import { DeleteProjectImageExecute } from './application/commands/delete-project-image.execute';
import { GetProjectImageExecute } from './application/queries/get-project-image.execute';
import { StoreProjectImageHandler } from './application/events/store-project-image.handler';

@Module({
    imports: [CQRSModule],
    controllers: [ProjectImageController],
    providers: [
        {
            provide: 'ProjectImageCommandRepository',
            useClass: TypeOrmProjectImageCommandRepository,
        },
        {
            provide: 'ProjectImageQueryRepository',
            useClass: TypeOrmProjectImageQueryRepository,
        },
        /**
         * Command
         */
        CreateProjectImageExecute,
        DeleteProjectImageExecute,

        /**
         * Query
         */
        GetProjectImageExecute,

        /**
         * Event command
         */
        StoreProjectImageHandler
    ],
})
export class ProjectImageModule implements OnModuleInit {

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
            CreateProjectImageExecute,
            DeleteProjectImageExecute,
            GetProjectImageExecute
        ]);

        this.event$.register([
            StoreProjectImageHandler
        ]);
    }
}
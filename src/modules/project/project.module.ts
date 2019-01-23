import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectController } from './project.controller';
import { TypeOrmProjectCommandRepository } from './repository/type-orm/type-orm-project.command.repository';
import { TypeOrmProjectQueryRepository } from './repository/type-orm/type-orm-project.query.repository';
import { CreateProjectExecute } from './application/commands/create-project.execute';
import { UpdateProjectExecute } from './application/commands/update-project.execute';
import { DeleteProjectExecute } from './application/commands/delete-project.execute';
import { GetProjectExecute } from './application/queries/get-project.execute';
import { GetByIdProjectExecute } from './application/queries/get-by-id-project.execute';
import { StoreProjectHandler } from './application/events/store-project.handler';

@Module({
    imports: [CQRSModule],
    controllers: [ProjectController],
    providers: [
        {
            provide: 'TypeOrmProjectCommandRepository',
            useClass: TypeOrmProjectCommandRepository
        },
        {
            provide: 'TypeOrmProjectQueryRepository',
            useClass: TypeOrmProjectQueryRepository
        },
        /**
         * Command
         */
        CreateProjectExecute,
        UpdateProjectExecute,
        DeleteProjectExecute,

        /**
         * Query
         */
        GetProjectExecute,
        GetByIdProjectExecute,

        /**
         * Event command
         */
        StoreProjectHandler
    ],
})
export class ProjectModule implements OnModuleInit {

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
            CreateProjectExecute,
            UpdateProjectExecute,
            DeleteProjectExecute,
            GetProjectExecute,
            GetByIdProjectExecute,
        ]);

        this.event$.register([StoreProjectHandler]);
    }
}
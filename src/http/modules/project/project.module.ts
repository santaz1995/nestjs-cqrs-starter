import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectController } from './project.controller';
import { TypeOrmProjectCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-project.command.repository';
import { TypeOrmProjectQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-project.query.repository';
import { CreateProjectExecute } from '../../../application/command/project/create-project.execute';
import { UpdateProjectExecute } from '../../../application/command/project/update-project.execute';
import { DeleteProjectExecute } from '../../../application/command/project/delete-project.execute';
import { GetProjectExecute } from '../../../application/query/project/get-project.execute';
import { GetByIdProjectExecute } from '../../../application/query/project/get-by-id-project.execute';
import { StoreProjectHandler } from '../../../application/event/project/store-project.handler';

@Module({
    imports: [CQRSModule],
    controllers: [ProjectController],
    providers: [
        {
            provide: 'ProjectCommandRepository',
            useClass: TypeOrmProjectCommandRepository
        },
        {
            provide: 'ProjectQueryRepository',
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
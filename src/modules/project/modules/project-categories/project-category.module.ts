import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectCategoryController } from './project-category.controller';
import { TypeOrmProjectCategoryCommandRepository } from './repository/type-orm/type-orm-project-category.command.repository';
import { TypeOrmProjectCategoryQueryRepository } from './repository/type-orm/type-orm-project-category.query.repository';
import { CreateProjectCategoryExecute } from './application/commands/create-project-category.execute';
import { UpdateProjectCategoryExecute } from './application/commands/update-project-category.execute';
import { DeleteProjectCategoryExecute } from './application/commands/delete-project-category.execute';
import { GetProjectCategoryExecute } from './application/queries/get-project-category.execute';
import { GetByIdProjectCategoryExecute } from './application/queries/get-by-id-project-category.execute';
import { StoreProjectCategoryHandler } from './application/events/store-project-category.handler';

@Module({
    imports: [CQRSModule],
    controllers: [ProjectCategoryController],
    providers: [
        {
            provide: 'ProjectCategoryCommandRepository',
            useClass: TypeOrmProjectCategoryCommandRepository,
        },
        {
            provide: 'TypeOrmProjectCategoryQueryRepository',
            useClass: TypeOrmProjectCategoryQueryRepository,
        },
        /**
         * Command
         */
        CreateProjectCategoryExecute,
        UpdateProjectCategoryExecute,
        DeleteProjectCategoryExecute,
        /**
         * Query
         */
        GetProjectCategoryExecute,
        GetByIdProjectCategoryExecute,
        /**
         * Event command
         */
        StoreProjectCategoryHandler
    ],
})
export class ProjectCategoryModule implements OnModuleInit {

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
            CreateProjectCategoryExecute,
            UpdateProjectCategoryExecute,
            DeleteProjectCategoryExecute,
            GetProjectCategoryExecute,
            GetByIdProjectCategoryExecute,
        ]);

        this.event$.register([
            StoreProjectCategoryHandler
        ]);
    }
}
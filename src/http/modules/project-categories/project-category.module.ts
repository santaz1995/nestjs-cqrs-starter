import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectCategoryController } from './project-category.controller';
import { TypeOrmProjectCategoryCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-project-category.command.repository';
import { TypeOrmProjectCategoryQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-project-category.query.repository';
import { CreateProjectCategoryExecute } from '../../../application/command/project-category/create-project-category.execute';
import { GetProjectCategoryExecute } from '../../../application/query/project-category/get-project-category.execute';
import { UpdateProjectCategoryExecute } from '../../../application/command/project-category/update-project-category.execute';
import { GetByIdProjectCategoryExecute } from '../../../application/query/project-category/get-by-id-project-category.execute';
import { DeleteProjectCategoryExecute } from '../../../application/command/project-category/delete-project-category.execute';
import { StoreProjectCategoryHandler } from '../../../application/event/project-category/store-project-category.handler';

@Module({
    modules: [CQRSModule],
    controllers: [ProjectCategoryController],
    components: [
        {
            provide: 'ProjectCategoryCommandRepository',
            useClass: TypeOrmProjectCategoryCommandRepository
        },
        {
            provide: 'ProjectCategoryQueryRepository',
            useClass: TypeOrmProjectCategoryQueryRepository
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
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly event$: EventBus,
    ) {
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

        this.event$.register([StoreProjectCategoryHandler]);
    }
}
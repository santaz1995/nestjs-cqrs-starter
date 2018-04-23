import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GetProjectCategoryExecute } from '../../../application/query/project-category/get-project-category.execute';
import { GetByIdProjectCategoryExecute } from '../../../application/query/project-category/get-by-id-project-category.execute';
import { ProjectImageController } from './project-image.controller';
import { TypeOrmProjectImageCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-project-image.command.repository';
import { TypeOrmProjectImageQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-project-image.query.repository';
import { DeleteProjectImageExecute } from '../../../application/command/project-image/delete-project-image.execute';
import { CreateProjectImageExecute } from '../../../application/command/project-image/create-project-image.execute';
import { StoreProjectImageHandler } from '../../../application/event/project-image/store-project-image.handler';

@Module({
    modules: [CQRSModule],
    controllers: [ProjectImageController],
    components: [
        {
            provide: 'ProjectImageCommandRepository',
            useClass: TypeOrmProjectImageCommandRepository
        },
        {
            provide: 'ProjectImageQueryRepository',
            useClass: TypeOrmProjectImageQueryRepository
        },
        /**
         * Command
         */
        CreateProjectImageExecute,
        DeleteProjectImageExecute,

        /**
         * Query
         */
        GetProjectCategoryExecute,
        GetByIdProjectCategoryExecute,

        /**
         * Event command
         */
        StoreProjectImageHandler
    ],
})
export class ProjectCategoryModule implements OnModuleInit {
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
            GetProjectCategoryExecute,
            GetByIdProjectCategoryExecute,
        ]);

        this.event$.register([StoreProjectImageHandler]);
    }
}
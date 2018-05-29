import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectSkillController } from './project-skill.controller';
import { TypeOrmProjectSkillQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-project-skill.query.repository';
import { TypeOrmProjectSkillCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-project-skill.command.repository';
import { CreateProjectSkillExecute } from '../../../application/command/project-skill/create-project-skill.execute';
import { DeleteProjectSkillExecute } from '../../../application/command/project-skill/delete-project-skill.execute';
import { GetProjectSkillExecute } from '../../../application/query/project-skill/get-project-skill.execute';
import { GetByIdProjectSkillExecute } from '../../../application/query/project-skill/get-by-id-project-skill.execute';
import { StoreProjectSkillHandler } from '../../../application/event/project-skill/store-project-skill.handler';
import { UpdateProjectSkillExecute } from '../../../application/command/project-skill/update-project-skill.execute';

@Module({
    imports: [CQRSModule],
    controllers: [ProjectSkillController],
    providers: [
        {
            provide: 'ProjectSkillCommandRepository',
            useClass: TypeOrmProjectSkillCommandRepository
        },
        {
            provide: 'ProjectSkillQueryRepository',
            useClass: TypeOrmProjectSkillQueryRepository
        },
        /**
         * Command
         */
        CreateProjectSkillExecute,
        UpdateProjectSkillExecute,
        DeleteProjectSkillExecute,

        /**
         * Query
         */
        GetProjectSkillExecute,
        GetByIdProjectSkillExecute,

        /**
         * Event command
         */
        StoreProjectSkillHandler
    ],
})
export class ProjectSkillModule implements OnModuleInit {

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
            CreateProjectSkillExecute,
            UpdateProjectSkillExecute,
            DeleteProjectSkillExecute,
            GetProjectSkillExecute,
            GetByIdProjectSkillExecute,
        ]);

        this.event$.register([
            StoreProjectSkillHandler
        ]);
    }
}
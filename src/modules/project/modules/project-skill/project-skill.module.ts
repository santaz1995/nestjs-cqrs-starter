import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ProjectSkillController } from './project-skill.controller';
import { TypeOrmProjectSkillCommandRepository } from './repository/type-orm/type-orm-project-skill.command.repository';
import { TypeOrmProjectSkillQueryRepository } from './repository/type-orm/type-orm-project-skill.query.repository';
import { CreateProjectSkillExecute } from './application/commands/create-project-skill.execute';
import { UpdateProjectSkillExecute } from './application/commands/update-project-skill.execute';
import { DeleteProjectSkillExecute } from './application/commands/delete-project-skill.execute';
import { GetProjectSkillExecute } from './application/queries/get-project-skill.execute';
import { GetByIdProjectSkillExecute } from './application/queries/get-by-id-project-skill.execute';
import { StoreProjectSkillHandler } from './application/events/store-project-skill.handler';

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
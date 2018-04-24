import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProjectSkillCommand } from './create-project-skill.command';
import { ProjectSkillCommandRepository } from '../../../domains/project-skill/project-skill.command.repository';
import { ProjectSkill } from '../../../domains/project-skill/project-skill';

@CommandHandler(CreateProjectSkillCommand)
export class CreateProjectSkillExecute implements ICommandHandler<CreateProjectSkillCommand> {

    constructor(
        @Inject('ProjectSkillCommandRepository') private projectSkillRepository: ProjectSkillCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateProjectSkillCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreateProjectSkillCommand, resolve: (value?) => void) {

        resolve();

        const projectSkill = ProjectSkill.register(
            command.title,
        );

        const projectSkillRegister = this.publisher.mergeObjectContext(
            await this.projectSkillRepository.store(projectSkill),
        );

        projectSkillRegister.store(projectSkill);
        projectSkillRegister.commit();

    }
}

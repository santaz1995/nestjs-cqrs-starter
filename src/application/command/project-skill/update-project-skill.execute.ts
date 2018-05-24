import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProjectSkillCommand } from './update-project-skill.command';
import { ProjectSkillCommandRepository } from '../../../domains/project-skill/project-skill.command.repository';

@CommandHandler(UpdateProjectSkillCommand)
export class UpdateProjectSkillExecute implements ICommandHandler<UpdateProjectSkillCommand> {

    constructor(
        @Inject('ProjectSkillCommandRepository') private projectSkillRepository: ProjectSkillCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {UpdateProjectSkillCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: UpdateProjectSkillCommand, resolve: (value?) => void) {

        resolve();

        const projectSkill = await this.projectSkillRepository.byId(command.id);

        projectSkill.title = command.title;

        const projectSkillRegister = this.publisher.mergeObjectContext(
            await this.projectSkillRepository.store(projectSkill),
        );

        projectSkillRegister.store(projectSkill);
        projectSkillRegister.commit();
    }
}

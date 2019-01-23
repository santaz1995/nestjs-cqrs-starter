import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteProjectSkillCommand } from './delete-project-skill.command';
import { ProjectSkillCommandRepository } from '../../domain/project-skill.command.repository';

@CommandHandler(DeleteProjectSkillCommand)
export class DeleteProjectSkillExecute implements ICommandHandler<DeleteProjectSkillCommand> {

    constructor(
        @Inject('ProjectSkillCommandRepository') private projectSkillRepository: ProjectSkillCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {DeleteProjectSkillCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: DeleteProjectSkillCommand, resolve: (value?) => void) {

        resolve();

        const projectSkill = await this.projectSkillRepository.byId(command.id);

        projectSkill.remove();

        const projectSkillRegister = this.publisher.mergeObjectContext(
            await this.projectSkillRepository.store(projectSkill),
        );

        projectSkillRegister.store(projectSkill);
        projectSkillRegister.commit();
    }
}

import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectSkillCommand } from './get-project-skill.command';
import { ProjectSkillQueryRepository } from '../../domain/project-skill.query.repository';

@CommandHandler(GetProjectSkillCommand)
export class GetProjectSkillExecute implements ICommandHandler<GetProjectSkillCommand> {

    constructor(
        @Inject('ProjectSkillQueryRepository') private projectSkillRepository: ProjectSkillQueryRepository) {
    }

    /**
     * @param {GetProjectSkillCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetProjectSkillCommand, resolve: (value?) => void) {

        resolve(this.projectSkillRepository.getAll());
    }
}

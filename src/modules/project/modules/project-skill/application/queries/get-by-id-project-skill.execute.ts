import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetByIdProjectSkillCommand } from './get-by-id-project-skill.command';
import { ProjectSkillQueryRepository } from '../../domain/project-skill.query.repository';

@CommandHandler(GetByIdProjectSkillCommand)
export class GetByIdProjectSkillExecute implements ICommandHandler<GetByIdProjectSkillCommand> {

    constructor(
        @Inject('ProjectSkillQueryRepository') private projectSkillRepository: ProjectSkillQueryRepository) {
    }

    /**
     * @param {GetByIdProjectSkillCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdProjectSkillCommand, resolve: (value?) => void) {

        resolve(this.projectSkillRepository.getById(command.id));
    }
}

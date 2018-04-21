import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectCommand } from './get-project.command';
import { ProjectQueryRepository } from '../../../domains/project/project.query.repository';

@CommandHandler(GetProjectCommand)
export class GetProjectExecute implements ICommandHandler<GetProjectCommand> {

    constructor(
        @Inject('ProjectQueryRepository') private projectRepository: ProjectQueryRepository) {
    }

    /**
     * @param {GetProjectCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetProjectCommand, resolve: (value?) => void) {

        resolve(await this.projectRepository.getAll());
    }
}

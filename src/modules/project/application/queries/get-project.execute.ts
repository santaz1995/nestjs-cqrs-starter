import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectCommand } from './get-project.command';
import { ProjectQueryRepository } from '../../domain/project.query.repository';

@CommandHandler(GetProjectCommand)
export class GetProjectExecute implements ICommandHandler<GetProjectCommand> {

    constructor(
        @Inject('TypeOrmProjectQueryRepository') private projectRepository: ProjectQueryRepository) {
    }

    /**
     * @param {GetProjectCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetProjectCommand, resolve: (value?) => void) {

        resolve(this.projectRepository.getAll());
    }
}

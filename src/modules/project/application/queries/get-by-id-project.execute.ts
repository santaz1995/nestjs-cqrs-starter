import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetByIdProjectCommand } from './get-by-id-project.command';
import { ProjectQueryRepository } from '../../domain/project.query.repository';

@CommandHandler(GetByIdProjectCommand)
export class GetByIdProjectExecute implements ICommandHandler<GetByIdProjectCommand> {

    constructor(
        @Inject('TypeOrmProjectQueryRepository') private projectRepository: ProjectQueryRepository) {
    }

    /**
     * @param {projectRepository} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdProjectCommand, resolve: (value?) => void) {

        resolve(this.projectRepository.getById(command.id));
    }
}

import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectImageCommand } from './get-project-image.command';
import { ProjectImageQueryRepository } from '../../../domains/project-image/project-image.query.repository';

@CommandHandler(GetProjectImageCommand)
export class GetProjectImageExecute implements ICommandHandler<GetProjectImageCommand> {

    constructor(
        @Inject('ProjectImageQueryRepository') private projectImageRepository: ProjectImageQueryRepository) {
    }

    /**
     * @param {GetProjectImageCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetProjectImageCommand, resolve: (value?) => void) {

        resolve(await this.projectImageRepository.getAll(command.id));
    }
}

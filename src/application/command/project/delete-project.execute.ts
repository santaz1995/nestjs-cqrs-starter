import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteProjectCommand } from './delete-project.command';
import { ProjectCommandRepository } from '../../../domains/project/project.command.repository';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectExecute implements ICommandHandler<DeleteProjectCommand> {

    constructor(
        @Inject('ProjectCommandRepository') private projectRepository: ProjectCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {DeleteProjectCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: DeleteProjectCommand, resolve: (value?) => void) {

        resolve();

        const project = await this.projectRepository.byId(command.id);

        project.remove();

        const projectRegister = this.publisher.mergeObjectContext(
            await this.projectRepository.store(project),
        );

        projectRegister.store(project);
        projectRegister.commit();
    }
}

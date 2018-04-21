import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteProjectImageCommand } from './delete-project-image.command';
import { ProjectImageCommandRepository } from '../../../domains/project-image/project-image.command.repository';

@CommandHandler(DeleteProjectImageCommand)
export class DeleteProjectImageExecute implements ICommandHandler<DeleteProjectImageCommand> {

    constructor(
        @Inject('ProjectImageCommandRepository') private projectImageRepository: ProjectImageCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {DeleteProjectImageCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: DeleteProjectImageCommand, resolve: (value?) => void) {

        resolve();

        const projectImage = await this.projectImageRepository.byId(command.id);

        projectImage.remove();

        const projectImageRegister = this.publisher.mergeObjectContext(
            await this.projectImageRepository.store(projectImage),
        );

        projectImageRegister.store(projectImage);
        projectImageRegister.commit();
    }
}

import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProjectImageCommand } from './create-project-image.command';
import { ProjectImageCommandRepository } from '../../../domains/project-image/project-image.command.repository';
import { ProjectImage } from '../../../domains/project-image/project-image';

@CommandHandler(CreateProjectImageCommand)
export class CreateProjectImageExecute implements ICommandHandler<CreateProjectImageCommand> {

    constructor(
        @Inject('ProjectImageCommandRepository') private projectImageRepository: ProjectImageCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateProjectImageCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreateProjectImageCommand, resolve: (value?) => void) {

        resolve();

        const projectImage = ProjectImage.register(
            command.projectId,
            command.imagePath,
        );

        const projectImageRegister = this.publisher.mergeObjectContext(
            await this.projectImageRepository.store(projectImage),
        );

        projectImageRegister.store(projectImage);
        projectImageRegister.commit();

    }
}

import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProjectCommand } from './create-project.command';
import { ProjectCommandRepository } from '../../domain/project.command.repository';
import { Project } from '../../domain/project';

@CommandHandler(CreateProjectCommand)
export class CreateProjectExecute implements ICommandHandler<CreateProjectCommand> {

    constructor(
        @Inject('TypeOrmProjectCommandRepository') private projectRepository: ProjectCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateProjectCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreateProjectCommand, resolve: (value?) => void) {

        resolve();

        const project = Project.register(
            command.title,
            command.description,
            command.company,
            command.url,
            command.realestDate,
            command.slug,
            command.projectCategories,
        );
        const feedbackRegister = this.publisher.mergeObjectContext(
            await this.projectRepository.store(project),
        );

        feedbackRegister.store(project);
        feedbackRegister.commit();
    }
}

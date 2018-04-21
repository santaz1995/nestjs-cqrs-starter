import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProjectCommand } from './update-project.command';
import { ProjectCommandRepository } from '../../../domains/project/project.command.repository';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectExecute implements ICommandHandler<UpdateProjectCommand> {

    constructor(
        @Inject('ProjectCommandRepository') private projectRepository: ProjectCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {UpdateProjectCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: UpdateProjectCommand, resolve: (value?) => void) {

        resolve();

        const project = await this.projectRepository.byId(command.id);

        project.title = command.title;
        project.description = command.description;
        project.company = command.company;
        project.url = command.url;
        project.realestDate = command.realestDate;

        const projectRegister = this.publisher.mergeObjectContext(
            await this.projectRepository.store(project),
        );

        projectRegister.store(project);
        projectRegister.commit();
    }
}

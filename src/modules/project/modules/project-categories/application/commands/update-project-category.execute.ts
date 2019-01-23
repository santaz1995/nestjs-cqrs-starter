import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProjectCategoryCommand } from './update-project-category.command';
import { ProjectCategoryCommandRepository } from '../../domain/project-category.command.repository';

@CommandHandler(UpdateProjectCategoryCommand)
export class UpdateProjectCategoryExecute implements ICommandHandler<UpdateProjectCategoryCommand> {

    constructor(
        @Inject('ProjectCategoryCommandRepository') private projectCategoryRepository: ProjectCategoryCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {UpdateProjectCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: UpdateProjectCategoryCommand, resolve: (value?) => void) {

        resolve();

        const projectCategory = await this.projectCategoryRepository.byId(command.id);

        projectCategory.title = command.title;

        const projectCategoryRegister = this.publisher.mergeObjectContext(
            await this.projectCategoryRepository.store(projectCategory),
        );

        projectCategoryRegister.store(projectCategory);
        projectCategoryRegister.commit();
    }
}

import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProjectCategoryCommand } from './create-project-category.command';
import { ProjectCategoryCommandRepository } from '../../domain/project-category.command.repository';
import { ProjectCategory } from '../../domain/project-category';

@CommandHandler(CreateProjectCategoryCommand)
export class CreateProjectCategoryExecute implements ICommandHandler<CreateProjectCategoryCommand> {

    constructor(
        @Inject('ProjectCategoryCommandRepository') private projectCategoryRepository: ProjectCategoryCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateProjectCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreateProjectCategoryCommand, resolve: (value?) => void) {

        resolve();

        const projectCategory = ProjectCategory.register(
            command.title,
        );

        const projectCategoryRegister = this.publisher.mergeObjectContext(
            await this.projectCategoryRepository.store(projectCategory),
        );

        projectCategoryRegister.store(projectCategory);
        projectCategoryRegister.commit();

    }
}

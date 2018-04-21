import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProjectCategoryCommand } from './create-project-category.command';
import { ProjectCategory } from '../../../domains/project-category/project-category';
import { ProjectCategoryCommandRepository } from '../../../domains/project-category/project-category.command.repository';

@CommandHandler(CreateProjectCategoryCommand)
export class CreateProjectCategoryExecute implements ICommandHandler<CreateProjectCategoryCommand> {

    constructor(
        @Inject('ProjectCategoryCommandRepository') private projectCategoryRepository: ProjectCategoryCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateFeedbackCommand} command
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

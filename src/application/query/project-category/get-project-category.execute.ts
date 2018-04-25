import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectCategoryCommand } from './get-project-category.command';
import { ProjectCategoryQueryRepository } from '../../../domains/project-category/project-category.query.repository';

@CommandHandler(GetProjectCategoryCommand)
export class GetProjectCategoryExecute implements ICommandHandler<GetProjectCategoryCommand> {

    constructor(
        @Inject('ProjectCategoryQueryRepository') private projectCategoryRepository: ProjectCategoryQueryRepository) {
    }

    /**
     * @param {GetProjectCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetProjectCategoryCommand, resolve: (value?) => void) {

        resolve(this.projectCategoryRepository.getAll());
    }
}

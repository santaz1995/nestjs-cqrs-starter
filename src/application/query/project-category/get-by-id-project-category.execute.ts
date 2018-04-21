import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProjectCategoryQueryRepository } from '../../../domains/project-category/project-category.query.repository';
import { GetByIdProjectCategoryCommand } from './get-by-id-project-category.command';

@CommandHandler(GetByIdProjectCategoryCommand)
export class GetByIdProjectCategoryExecute implements ICommandHandler<GetByIdProjectCategoryCommand> {

    constructor(
        @Inject('ProjectCategoryQueryRepository') private projectCategoryRepository: ProjectCategoryQueryRepository) {
    }

    /**
     * @param {GetByIdProjectCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdProjectCategoryCommand, resolve: (value?) => void) {

        resolve(await this.projectCategoryRepository.getById(command.id));
    }
}

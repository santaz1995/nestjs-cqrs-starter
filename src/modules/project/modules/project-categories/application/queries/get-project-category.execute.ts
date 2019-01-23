import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProjectCategoryCommand } from './get-project-category.command';
import { ProjectCategoryQueryRepository } from '../../domain/project-category.query.repository';

@CommandHandler(GetProjectCategoryCommand)
export class GetProjectCategoryExecute implements ICommandHandler<GetProjectCategoryCommand> {

    constructor(
        @Inject('TypeOrmProjectCategoryQueryRepository') private projectCategoryRepository: ProjectCategoryQueryRepository) {
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

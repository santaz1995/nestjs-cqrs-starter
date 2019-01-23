import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetByIdProjectCategoryCommand } from './get-by-id-project-category.command';
import { ProjectCategoryQueryRepository } from '../../domain/project-category.query.repository';

@CommandHandler(GetByIdProjectCategoryCommand)
export class GetByIdProjectCategoryExecute implements ICommandHandler<GetByIdProjectCategoryCommand> {

    constructor(
        @Inject('TypeOrmProjectCategoryQueryRepository') private projectCategoryRepository: ProjectCategoryQueryRepository) {
    }

    /**
     * @param {GetByIdProjectCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdProjectCategoryCommand, resolve: (value?) => void) {

        resolve(this.projectCategoryRepository.getById(command.id));
    }
}

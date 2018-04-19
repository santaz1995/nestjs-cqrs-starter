import { ICommand } from '@nestjs/cqrs';

export class DeletePortfolioCategoryCommand implements ICommand {

    constructor(public readonly id: number) {}
}

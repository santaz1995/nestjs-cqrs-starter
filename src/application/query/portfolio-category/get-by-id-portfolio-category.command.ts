import { ICommand } from '@nestjs/cqrs';

export class GetByIdPortfolioCategoryCommand implements ICommand {

    constructor(public readonly id: number) {}
}

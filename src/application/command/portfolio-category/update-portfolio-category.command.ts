import { ICommand } from '@nestjs/cqrs';
import { PortfolioCategoryDto } from "../../../infrastructures/dto/portfolio-category.dto";

export class UpdatePortfolioCategoryCommand implements ICommand {

    constructor(public readonly id: number, public readonly dto: PortfolioCategoryDto) {}
}

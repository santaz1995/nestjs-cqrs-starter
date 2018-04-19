import { ICommand } from '@nestjs/cqrs';
import { PortfolioCategoryDto } from "../../../infrastructures/dto/portfolio-category.dto";

export class CreatePortfolioCategoryCommand implements ICommand {

    constructor(public readonly dto: PortfolioCategoryDto) {
    }
}

import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeletePortfolioCategoryCommand implements ICommand {

    @IsNumber()
    @IsNotEmpty()
    readonly _id: number;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }
}

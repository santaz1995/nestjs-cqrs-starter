import { ICommand } from '@nestjs/cqrs';

export class DeletePortfolioCommand implements ICommand {

    readonly _id: number;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }
}

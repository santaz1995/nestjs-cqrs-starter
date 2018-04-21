import { ICommand } from '@nestjs/cqrs';

export class GetProjectImageCommand implements ICommand {

    readonly _id: number;

    /**
     * @param {number} id
     */
    constructor(id: number) {
        this._id = id;
    }

    /**
     * @returns {number}
     */
    get id(): number {
        return this._id;
    }
}

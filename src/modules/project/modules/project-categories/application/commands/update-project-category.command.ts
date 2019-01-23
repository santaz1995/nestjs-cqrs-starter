import { ICommand } from '@nestjs/cqrs';

export class UpdateProjectCategoryCommand implements ICommand {

    readonly _id: number;

    readonly _title: string;

    /**
     * @param {number} id
     * @param {string} title
     */
    constructor(id: number, title: string) {
        this._id = id;
        this._title = title;
    }

    /**
     * @returns {number}
     */
    get id(): number {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get title(): string {
        return this._title;
    }
}

import { ICommand } from '@nestjs/cqrs';

export class CreateProjectSkillCommand implements ICommand {

    readonly _title: string;

    /**
     * @param {string} title
     */
    constructor(title: string) {
        this._title = title;
    }

    /**
     * @returns {string}
     */
    get title(): string {
        return this._title;
    }
}

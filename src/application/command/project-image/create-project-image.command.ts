import { ICommand } from '@nestjs/cqrs';

export class CreateProjectImageCommand implements ICommand {

    readonly _projectId: number;

    readonly _imagePath: string;

    /**
     * @param {number} projectId
     * @param {string} imagePath
     */
    constructor(projectId: number, imagePath: string) {
        this._projectId = projectId;
        this._imagePath = imagePath;
    }

    /**
     * @returns number
     */
    get projectId(): number {
        return this._projectId;
    }

    /**
     * @returns string
     */
    get imagePath(): string {
        return this._imagePath;
    }
}

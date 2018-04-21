import { IEvent } from '@nestjs/cqrs';
import { Project } from '../../../domains/project/project';

export class StoreProjectEvent implements IEvent {

    readonly _project: Project;

    constructor(project: Project) {
        this._project = project;

    }

    /**
     * @returns {Project}
     */
    get project(): Project {
        return this._project
    }
}

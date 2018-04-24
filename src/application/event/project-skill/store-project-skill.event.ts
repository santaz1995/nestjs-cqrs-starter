import { IEvent } from '@nestjs/cqrs';
import { ProjectSkill } from '../../../domains/project-skill/project-skill';

export class StoreProjectSkillEvent implements IEvent {

    readonly _projectSkill: ProjectSkill;

    /**
     * @param {ProjectSkill} projectSkill
     */
    constructor(projectSkill: ProjectSkill) {
        this._projectSkill = projectSkill;

    }

    /**
     * @returns {ProjectSkill}
     */
    get projectSkill(): ProjectSkill {
        return this._projectSkill
    }
}

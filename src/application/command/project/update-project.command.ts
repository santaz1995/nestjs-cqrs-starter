import { ICommand } from '@nestjs/cqrs';
import * as slug from  'slug';
import { ProjectCategory } from '../../../domains/project-category/project-category';

export class UpdateProjectCommand implements ICommand {

    readonly _id: number;

    readonly _title: string;

    readonly _description: string;

    readonly _company: string;

    readonly _url: string;

    readonly _realestDate: Date;

    readonly _slug: string;

    readonly _projectCategories: ProjectCategory[];

    /**
     * @param {number} id
     * @param {string} title
     * @param {string} description
     * @param {string} company
     * @param {string} url
     * @param {Date} realestDate
     * @param {ProjectCategory[]} projectCategories
     */
    constructor(id: number, title: string, description: string, company: string, url: string, realestDate: Date, projectCategories: ProjectCategory[]) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._company = company;
        this._url = url;
        this._realestDate = realestDate;
        this._slug = slug(title);
        this._projectCategories = projectCategories;
    }

    get id(): number {
        return this._id;
    }

    /**
     * @returns {string}
     */
    get title(): string {
        return this._title;
    }

    /**
     * @returns {string}
     */
    get description(): string {
        return this._description;
    }

    /**
     * @returns {string}
     */
    get company(): string {
        return this._company;
    }

    /**
     * @returns {string}
     */
    get url(): string {
        return this._url;
    }

    /**
     * @returns {Date}
     */
    get realestDate(): Date {
        return this._realestDate;
    }

    /**
     * @returns {string}
     */
    get slug(): string {
        return this._slug;
    }

    /**
     * @returns {ProjectCategory[]}
     */
    get projectCategories(): ProjectCategory[] {
        return this._projectCategories;
    }
}

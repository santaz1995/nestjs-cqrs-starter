import { ICommand } from '@nestjs/cqrs';

export class CreatePortfolioCommand implements ICommand {

    readonly _title: string;

    readonly _description: string;

    readonly _company: string;

    readonly _url: string;

    readonly _realestDate: Date;

    constructor(title: string, description: string, company: string, url: string, realestDate: Date) {
        this._title = title;
        this._description = description;
        this._company = company;
        this._url = url;
        this._realestDate = realestDate;
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
}

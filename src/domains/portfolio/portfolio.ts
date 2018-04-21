import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StorePortfolioEvent } from '../../application/event/portfolio/store-portfolio.event';

@Entity('portfolio')
export class Portfolio extends AggregateRoot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'title',
        type: 'varchar',
        length: 60,
        nullable: false
    })
    title: string;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    description: string;

    @Column({
        name: 'company',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    company: string;

    @Column({
        name: 'url',
        type: 'varchar',
        length: 255,
        nullable: null
    })
    url: string;

    @Column({
        name: 'realest_date',
        type: 'timestamp',
        nullable: null
    })
    @Exclude()
    realestDate: Date;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    @Exclude()
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    @Exclude()
    updatedAt: Date;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true
    })
    @Exclude()
    deletedAt: Date;

    constructor(title: string, description: string, company: string, url: string, realestDate: Date, createdAt: Date) {
        super();
        this.title = title;
        this.description = description;
        this.company = company;
        this.url = url;
        this.realestDate = realestDate;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} title
     * @param {string} description
     * @param {string} company
     * @param {string} url
     * @param {Date} realestDate
     * @returns {Portfolio}
     */
    static register(title: string, description: string, company: string, url: string, realestDate: Date): Portfolio {
        return new Portfolio(title, description, company, url, realestDate, new Date());
    }

    /**
     * Create event for save portfolio-category to query db
     * @param {Portfolio} portfolio
     */
    public store(portfolio: Portfolio) {
        this.apply(new StorePortfolioEvent(portfolio));
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
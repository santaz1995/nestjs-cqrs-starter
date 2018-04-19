import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('portfolio-categories')
export class PortfolioCategory extends AggregateRoot {

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

    constructor(title: string, createdAt: Date) {
        super();
        this.title = title;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} title
     * @returns {PortfolioCategory}
     */
    static register(title: string): PortfolioCategory {
        return new PortfolioCategory(title, new Date());
    }

    /**
     * Create event for save portfolio-category to query db
     * @param {PortfolioCategory} portfolioCategory
     */
    public create(portfolioCategory: PortfolioCategory) {
       /** TODO: Add event to save portfolio category to query db */
    }

    /**
     * Create event for update portfolio-category to query db
     * @param {number} id
     * @param {PortfolioCategory} portfolioCategory
     */
    public update(id: number, portfolioCategory: PortfolioCategory) {
       /** TODO: Add event to save portfolio category to query db */
    }

    /**
     * Create event for delete portfolio-category to query db
     * @param {number} id
     */
    public delete(id: number) {
       /** TODO: Add event to save portfolio category to query db */
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
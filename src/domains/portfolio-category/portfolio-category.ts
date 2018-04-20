import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StorePortfolioCategoryEvent } from '../../application/event/category-feedback/store-portfolio-category.event';

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
    public store(portfolioCategory: PortfolioCategory) {

        this.apply(new StorePortfolioCategoryEvent(portfolioCategory));
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
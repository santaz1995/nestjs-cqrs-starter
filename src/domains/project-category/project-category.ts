import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProjectCategoryEvent } from '../../application/event/project-category/store-project-category.event';
import { Project } from '../project/project';


@Entity('project-categories')
export class ProjectCategory extends AggregateRoot {

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

    @ManyToMany( () => Project, project => project.projectCategories)
    @JoinTable({
        name: 'projects_categories',
        joinColumn: {
            name: 'project_category_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'project_id',
            referencedColumnName: 'id'
        },
    })
    project: Project[];

    constructor(title: string, createdAt: Date) {
        super();
        this.title = title;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} title
     * @returns {ProjectCategory}
     */
    static register(title: string): ProjectCategory {
        return new ProjectCategory(title, new Date());
    }

    /**
     * Create event for save project-category to query db
     * @param {ProjectCategory} projectCategory
     */
    public store(projectCategory: ProjectCategory) {

        this.apply(new StoreProjectCategoryEvent(projectCategory));
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
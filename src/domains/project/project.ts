import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProjectEvent } from '../../application/event/project/store-project.event';
import { ProjectCategory } from '../project-category/project-category';
import { ProjectImage } from '../project-image/project-image';

@Entity('projects')
export class Project extends AggregateRoot {

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

    @ManyToMany( () => ProjectCategory, projectCategory => projectCategory.project)
    @JoinTable({
        name: 'projects_categories',
        joinColumn: {
            name: 'project_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'project_category_id',
            referencedColumnName: 'id'
        }
    })
    projectCategories: ProjectCategory[];

    @OneToMany( () => ProjectImage, projectImage => projectImage.project)
    projectImages: ProjectImage[];

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
     * @returns {Project}
     */
    static register(title: string, description: string, company: string, url: string, realestDate: Date): Project {
        return new Project(title, description, company, url, realestDate, new Date());
    }

    /**
     * Create event for save project-category to query db
     * @param {Project} project
     */
    public store(project: Project) {
        this.apply(new StoreProjectEvent(project));
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
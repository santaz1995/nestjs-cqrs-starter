import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectImage } from '../modules/project-image/domain/project-image';
import { ProjectSkill } from '../modules/project-skill/domain/project-skill';
import { ProjectCategory } from '../modules/project-categories/domain/project-category';
import { StoreProjectEvent } from '../application/events/store-project.event';

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
        name: 'slug',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    slug: string;

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

    @ManyToMany(() => ProjectCategory, projectCategory => projectCategory.projects)
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

    @ManyToMany(() => ProjectSkill, projectSkill => projectSkill.projects, {
        eager: false
    })
    @JoinTable({
        name: 'projects_skills',
        joinColumn: {
            name: 'project_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'project_skill_id',
            referencedColumnName: 'id'
        }
    })
    projectSkills: ProjectCategory[];

    @OneToMany(() => ProjectImage, projectImage => projectImage.project)
    projectImages: ProjectImage[];

    constructor(title: string,
                description: string,
                company: string,
                url: string,
                realestDate: Date,
                slug: string,
                projectCategories: ProjectCategory[],
                createdAt: Date) {
        super();
        this.title = title;
        this.description = description;
        this.company = company;
        this.url = url;
        this.realestDate = realestDate;
        this.slug = slug;
        this.projectCategories = projectCategories;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} title
     * @param {string} description
     * @param {string} company
     * @param {string} url
     * @param {Date} realestDate
     * @param {string} slug
     * @param {ProjectCategory[]} projectCategories
     * @returns {Project}
     */
    static register(title: string,
                    description: string,
                    company: string,
                    url: string,
                    realestDate: Date,
                    slug: string,
                    projectCategories: ProjectCategory[]): Project {
        return new Project(title, description, company, url, realestDate, slug, projectCategories, new Date());
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
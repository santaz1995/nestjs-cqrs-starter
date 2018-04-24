import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project-categories')
export class ProjectSkill extends AggregateRoot {

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
     * @returns {ProjectSkill}
     */
    static register(title: string): ProjectSkill {
        return new ProjectSkill(title, new Date());
    }

    /**
     * Create event for save project-skill to query db
     * @param {ProjectSkill} projectSkill
     */
    public store(projectSkill: ProjectSkill) {

    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
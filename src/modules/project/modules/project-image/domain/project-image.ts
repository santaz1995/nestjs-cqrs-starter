import { Exclude } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProjectImageEvent } from '../application/events/store-project-image.event';
import { Project } from '../../../domain/project';

@Entity('project-images')
export class ProjectImage extends AggregateRoot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'project_id',
        type: 'integer',
        nullable: false
    })
    projectId: number;

    @Column({
        name: 'image_path',
        type: 'varchar',
        length: 60,
        nullable: false
    })
    imagePath: string;

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

    @ManyToOne( () => Project, project => project.projectImages)
    @JoinColumn({name: 'project_id', referencedColumnName: 'id'})
    project: Project;

    constructor(projectId: number, imagePath: string, createdAt: Date) {
        super();
        this.projectId = projectId;
        this.imagePath = imagePath;
        this.createdAt = createdAt;
    }

    /**
     * @param {number} projectId
     * @param {string} imagePath
     * @returns {ProjectImage}
     */
    static register(projectId: number, imagePath: string): ProjectImage {
        return new ProjectImage(projectId, imagePath, new Date());
    }

    /**
     * Create event for save project-image to query db
     * @param {ProjectImage} projectImage
     */
    public store(projectImage: ProjectImage) {
        this.apply(new StoreProjectImageEvent(projectImage));
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }
}
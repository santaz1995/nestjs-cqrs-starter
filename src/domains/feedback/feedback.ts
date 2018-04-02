import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('feedbacks')
export class Feedback {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    email: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 60,
        nullable: false
    })
    name: string;

    @Column({
        name: 'subject',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    subject: string;

    @Column({
        name: 'message',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    message: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    @Exclude()
    createdAt: Date;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true
    })
    @Exclude()
    deletedAt: Date;

    constructor(email: string, name: string, subject: string, message: string, createdAt: Date) {
        this.email = email;
        this.name = name;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
    }

    /**
     *
     * @param {string} email
     * @param {string} name
     * @param {string} subject
     * @param {string} message
     *
     * @returns {Feedback}
     */
    static register(email: string, name: string, subject: string, message: string): Feedback {
        return new Feedback(email, name, subject, message, new Date());
    }

    public remove(): void {
        this.deletedAt = new Date();
    }
}
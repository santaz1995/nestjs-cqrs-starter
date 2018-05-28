import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { AggregateRoot } from '@nestjs/cqrs';
import { StoreUserEvent } from '../../application/event/user/store-user.event';

@Entity('users')
@Index('users_email_deleted_sequence', ['email', 'deletedAt'], {unique: true})
export class User extends AggregateRoot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    email: string;

    @Exclude()
    @Column({
        name: 'password',
        type: 'varchar',
        length: 60,
        nullable: false
    })
    password: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    lastName: string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        nullable: false
    })
    isActive: boolean;

    @Expose({ groups: ['detail'] })
    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    createdAt: Date;

    @Exclude()
    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true
    })
    deletedAt: Date;

    constructor(email: string, password: string, firstName: string, lastName: string, createdAt: Date) {
        super();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = false;
        this.createdAt = createdAt;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {User}
     */
    static register(email: string, password: string, firstName: string, lastName: string): User {
        return new User(email, password, firstName, lastName, new Date());
    }

    /**
     * Soft delete
     */
    public remove(): void {
        this.deletedAt = new Date();
    }

    /**
     * Create event for save user to query db
     * @param {User} user
     */
    public store(user: User) {
        this.apply(new StoreUserEvent(user));
    }

    @Expose()
    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
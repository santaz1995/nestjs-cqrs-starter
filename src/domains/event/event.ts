import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('events')
export class Event {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    type: string;

    @Column({
        name: 'user_id'
    })
    userId: number;

    @Column()
    payload: object;

    @Exclude()
    createdAt: Date;

    constructor(type: string, userId: number, payload: object, createdAt: Date) {
        this.type = type;
        this.userId = userId;
        this.payload = payload;
        this.createdAt = createdAt;
    }

    static register(type: string, userId: number, payload: object): Event {
        return new Event(type, userId, payload, new Date());
    }
}
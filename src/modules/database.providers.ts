import { createConnection } from 'typeorm';
import { Feedback } from './feedbacks/domains/feedback';

export const DatabaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USER,
            password: process.env.DB_PW,
            entities: [
                Feedback,
            ],
            synchronize: true,
        }),
    },
];
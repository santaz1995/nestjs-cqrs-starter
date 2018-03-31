import './vendor';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { createConnection } from 'typeorm';
import { ValidationPipe } from './pipe/validation.pipe';

async function bootstrap() {
    createConnection().then(async connection => {

        const app = await NestFactory.create(ApplicationModule);
        app.setGlobalPrefix('api');
        app.use(bodyParser.json());
        app.useGlobalPipes(new ValidationPipe());
        app.listen(3000, () => console.log('Application is listening on port 3000.'));

    }).catch(error => console.log('TypeORM connection error: ', error));

}
bootstrap();
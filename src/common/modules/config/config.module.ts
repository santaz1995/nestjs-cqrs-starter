import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            /**
             * TODO: dynamic set variable
             */
            useValue: new ConfigService(`.env`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
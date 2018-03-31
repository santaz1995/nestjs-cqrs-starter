import { Module } from '@nestjs/common';
import { HeroesGameModule } from './heroes/heroes.module';
import { FeedbackModule } from './feedbacks/feedback.module';

@Module({
    modules: [
        HeroesGameModule,
        FeedbackModule
    ],
    components: [
    ]
})
export class ApplicationModule {
}

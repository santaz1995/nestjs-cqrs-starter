import { Module } from '@nestjs/common';
import { FeedbackModule } from './http/modules/feedbacks/feedback.module';

@Module({
    modules: [
        FeedbackModule
    ],
    components: [
    ]
})
export class ApplicationModule {
}

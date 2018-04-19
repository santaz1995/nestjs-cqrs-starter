import { Module } from '@nestjs/common';
import { FeedbackModule } from './http/modules/feedbacks/feedback.module';
import { PortfolioCategoryModule } from "./http/modules/portfolio-categories/portfolio-category.module";

@Module({
    modules: [
        FeedbackModule,
        PortfolioCategoryModule
    ],
    components: [
    ]
})
export class ApplicationModule {
}

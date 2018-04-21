import { Module } from '@nestjs/common';
import { FeedbackModule } from './http/modules/feedbacks/feedback.module';
import { ProjectCategoryModule } from './http/modules/project-categories/project-category.module';
import { ProjectModule } from './http/modules/project/project.module';

@Module({
    modules: [
        FeedbackModule,
        ProjectCategoryModule,
        ProjectModule,
    ],
    components: [
    ]
})
export class ApplicationModule {
}

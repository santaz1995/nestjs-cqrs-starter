import { Module } from '@nestjs/common';
import { FeedbackModule } from './http/modules/feedbacks/feedback.module';
import { ProjectCategoryModule } from './http/modules/project-categories/project-category.module';
import { ProjectModule } from './http/modules/project/project.module';
import { UploadModule } from './http/modules/upload/upload.module';
import { ProjectSkill } from './domains/project-skill/project-skill';

@Module({
    modules: [
        FeedbackModule,
        ProjectModule,
        ProjectCategoryModule,
        ProjectSkill,
        UploadModule
    ],
    components: [
    ]
})
export class ApplicationModule {
}

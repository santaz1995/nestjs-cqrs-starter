import { Module } from '@nestjs/common';
import { FeedbackModule } from './http/modules/feedbacks/feedback.module';
import { ProjectCategoryModule } from './http/modules/project-categories/project-category.module';
import { ProjectModule } from './http/modules/project/project.module';
import { UploadModule } from './http/modules/upload/upload.module';
import { ProjectSkillModule } from './http/modules/project-skill/project-skill.module';
import { ProjectImageModule } from './http/modules/project-image/project-image.module';

@Module({
    modules: [
        FeedbackModule,
        ProjectModule,
        ProjectCategoryModule,
        ProjectSkillModule,
        ProjectImageModule,
        UploadModule
    ],
    components: [
    ]
})
export class ApplicationModule {
}

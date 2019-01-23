import { FeedbackModule } from './modules/feedbacks/feedback.module';
import { ProjectCategoryModule } from './modules/project/modules/project-categories/project-category.module';
import { ProjectModule } from './modules/project/project.module';
import { UploadModule } from './modules/upload/upload.module';
import { ProjectSkillModule } from './modules/project/modules/project-skill/project-skill.module';
import { ProjectImageModule } from './modules/project/modules/project-image/project-image.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        FeedbackModule,
        ProjectModule,
        ProjectCategoryModule,
        ProjectSkillModule,
        ProjectImageModule,
        UploadModule,
        AuthorizationModule
    ],
})
export class ApplicationModule {}

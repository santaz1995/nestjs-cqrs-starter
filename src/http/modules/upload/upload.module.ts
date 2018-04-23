import { CommandBus, CQRSModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UploadController } from './upload.controller';
import { UploadBase64Execute } from '../../../application/command/upload/upload-base64.execute';

@Module({
    modules: [CQRSModule],
    controllers: [UploadController],
    components: [
        UploadBase64Execute,
    ],
})
export class UploadModule implements OnModuleInit {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus) {
    }

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);

        this.command$.register([UploadBase64Execute]);
    }
}
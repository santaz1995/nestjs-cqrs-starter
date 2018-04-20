import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PortfolioCategoryController } from "./portfolio-category.controller";
import { TypeOrmPortfolioCategoryCommandRepository } from "../../../infrastructures/domain/typeorm/command/type-orm-portfolio-category.command.repository";
import { TypeOrmPortfolioCategoryQueryRepository } from "../../../infrastructures/domain/typeorm/query/type-orm-portfolio-category.query.repository";
import { CreatePortfolioCategoryExecute } from "../../../application/command/portfolio-category/create-portfolio-category.execute";
import { GetPortfolioCategoryExecute } from "../../../application/query/portfolio-category/get-portfolio-category.execute";
import { UpdatePortfolioCategoryExecute } from "../../../application/command/portfolio-category/update-portfolio-category.execute";
import { GetByIdPortfolioCategoryExecute } from "../../../application/query/portfolio-category/get-by-id-portfolio-category.execute";
import { DeletePortfolioCategoryExecute } from "../../../application/command/portfolio-category/delete-portfolio-category.execute";
import { StorePortfolioCategoryHandler } from '../../../application/event/category-feedback/store-portfolio-category.handler';

@Module({
    modules: [CQRSModule],
    controllers: [PortfolioCategoryController],
    components: [
        {
            provide: 'PortfolioCategoryCommandRepository',
            useClass: TypeOrmPortfolioCategoryCommandRepository
        },
        {
            provide: 'PortfolioCategoryQueryRepository',
            useClass: TypeOrmPortfolioCategoryQueryRepository
        },
        CreatePortfolioCategoryExecute,
        UpdatePortfolioCategoryExecute,
        GetPortfolioCategoryExecute,
        GetByIdPortfolioCategoryExecute,
        DeletePortfolioCategoryExecute
    ],
})
export class PortfolioCategoryModule implements OnModuleInit {
    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly command$: CommandBus,
        private readonly event$: EventBus,
    ) {
    }

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);
        this.event$.setModuleRef(this.moduleRef);

        this.command$.register([
            CreatePortfolioCategoryExecute,
            UpdatePortfolioCategoryExecute,
            GetPortfolioCategoryExecute,
            GetByIdPortfolioCategoryExecute,
            DeletePortfolioCategoryExecute
        ]);

        this.event$.register([StorePortfolioCategoryHandler]);
    }
}
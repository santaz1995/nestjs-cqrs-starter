import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmPortfolioCommandRepository } from '../../../infrastructures/domain/typeorm/command/type-orm-portfolio.command.repository';
import { TypeOrmPortfolioQueryRepository } from '../../../infrastructures/domain/typeorm/query/type-orm-portfolio.query.repository';
import { CreatePortfolioExecute } from '../../../application/command/portfolio/create-portfolio.execute';
import { UpdatePortfolioExecute } from '../../../application/command/portfolio/update-portfolio.execute';
import { DeletePortfolioExecute } from '../../../application/command/portfolio/delete-portfolio.execute';
import { GetPortfolioExecute } from '../../../application/query/portfolio/get-portfolio.execute';
import { GetByIdPortfolioExecute } from '../../../application/query/portfolio/get-by-id-portfolio.execute';
import { StorePortfolioHandler } from '../../../application/event/portfolio/store-portfolio.handler';

@Module({
    modules: [CQRSModule],
    controllers: [PortfolioController],
    components: [
        {
            provide: 'PortfolioCommandRepository',
            useClass: TypeOrmPortfolioCommandRepository
        },
        {
            provide: 'PortfolioQueryRepository',
            useClass: TypeOrmPortfolioQueryRepository
        },
        /**
         * Command
         */
        CreatePortfolioExecute,
        UpdatePortfolioExecute,
        DeletePortfolioExecute,

        /**
         * Query
         */
        GetPortfolioExecute,
        GetByIdPortfolioExecute,

        /**
         * Event command
         */
        StorePortfolioHandler
    ],
})
export class PortfolioModule implements OnModuleInit {
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
            CreatePortfolioExecute,
            UpdatePortfolioExecute,
            DeletePortfolioExecute,
            GetPortfolioExecute,
            GetByIdPortfolioExecute,
        ]);

        this.event$.register([StorePortfolioHandler]);
    }
}
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RunnersController } from './runners.controller.js';
import { RunnersService } from './runners.service.js';

@Module({
    imports: [PrismaModule],
    controllers: [RunnersController],
    providers: [RunnersService]
})
export class RunnersModule {}

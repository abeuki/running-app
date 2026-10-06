import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { RunPointsController } from './run-points.controller.js';
import { RunPointsService } from './run-points.service.js';

@Module({
    imports: [PrismaModule],
    controllers: [RunPointsController],
    providers: [RunPointsService]
})
export class RunPointsModule {}

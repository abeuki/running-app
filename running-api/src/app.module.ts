import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import {ConfigModule} from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { RunnersController } from './runners/runners.controller.js';
import { RunnersService } from './runners/runners.service.js';
import { RunnersModule } from './runners/runners.module.js';
import { RunsController } from './runs/runs.controller.js';
import { RunsService } from './runs/runs.service.js';
import { RunsModule } from './runs/runs.module.js';
import { RunPointsController } from './run-points/run-points.controller.js';
import { RunPointsService } from './run-points/run-points.service.js';
import { RunPointsModule } from './run-points/run-points.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    PrismaModule,
    RunnersModule,
    RunsModule,
    RunPointsModule,
  ],
  controllers: [AppController, RunnersController, RunsController, RunPointsController],
  providers: [AppService, RunnersService, RunsService, RunPointsService],
})
export class AppModule {}

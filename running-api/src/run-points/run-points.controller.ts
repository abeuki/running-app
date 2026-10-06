import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RunPointsService } from './run-points.service.js';

@Controller('runPoints')
export class RunPointsController {
    constructor(private runPointsService: RunPointsService){}

    @Get()
    findAll(){
        return this.runPointsService.findAll()
    }

    @Get()
    findByRunId(@Query('runId', ParseIntPipe) runId: number){
        return this.runPointsService.findByRunId(runId);
    }
}

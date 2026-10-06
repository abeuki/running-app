import { Controller, Get } from '@nestjs/common';
import { RunsService } from './runs.service.js';

@Controller('runs')
export class RunsController {
    constructor(private runsService: RunsService){}

    @Get()
    findAll(){
        return this.runsService.findAll();
    }
}

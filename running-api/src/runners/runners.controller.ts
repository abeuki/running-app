import { Controller, Get } from '@nestjs/common';
import { RunnersService } from './runners.service.js';

@Controller('runners')
export class RunnersController {
    constructor(private runnersService: RunnersService){}

    @Get()
    findAll(){
        return this.runnersService.findAll();
    }
}

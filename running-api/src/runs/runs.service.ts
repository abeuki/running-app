import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RunsService {
    constructor(private prisma: PrismaService){}

    findAll(){
        return this.prisma.run.findMany();
    }
}

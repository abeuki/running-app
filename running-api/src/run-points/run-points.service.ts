import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RunPointsService {
    constructor(private prisma: PrismaService){}

    findAll(){
        return this.prisma.runPoint.findMany();
    }

    findByRunId(runId: number) {
        return this.prisma.runPoint.findMany({
            where: {
                runId: runId
            }
        })
    }
}

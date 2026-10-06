import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RunnersService {
    constructor(private prisma: PrismaService){

    }

    findAll(){
        return this.prisma.runner.findMany();
    }
}

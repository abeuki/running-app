import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

// export type User =  
//prisma client sam zakljucuje tip
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    findByUsername(username: string){
        return this.prisma.user.findUnique({
            where: {
                username
            }
        });
    }
}

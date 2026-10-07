import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as argon2 from 'argon2'
import {JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string){
        const user = await this.usersService.findByUsername(username);

        if(!user){
            return null;
        }

        const isValid = await argon2.verify(user.password, pass);

        if(!isValid){
            return null;
        }

        const {password, ...result} = user;
        return result;
    }

    async login(user: any){
        const payload = {username: user.username, sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}

import { Controller, Post, Body, BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    @Post('register')
    async register(@Body() user: User): Promise<User> {
        try {
            const newUser = await this.usersService.createUser(user);
            return newUser;
        } catch (error: any) {
            throw new BadRequestException('Registration failed', error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('login')
    async login(@Body() user: User): Promise<{ accessToken: string }> {
        const foundUser = await this.usersService.findOneByUsername(user.username);
        if (!foundUser || foundUser.password !== user.password) {
            throw new BadRequestException('Invalid credentials');
        }

        const payload = { username: foundUser.username, sub: foundUser.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}

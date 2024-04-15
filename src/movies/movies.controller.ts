import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Movie> {
        return this.moviesService.findOne(id);
    }

    @Post()
    async create(@Body() movie: Movie): Promise<Movie> {
        return this.moviesService.create(movie);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
        return this.moviesService.update(id, movie);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.moviesService.delete(id);
    }
}

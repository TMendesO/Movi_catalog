import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private moviesRepository: Repository<Movie>,
    ) { }

    async findAll(): Promise<Movie[]> {
        return this.moviesRepository.find();
    }

    async findOne(id: number): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({ where: { id } });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    async create(movie: Movie): Promise<Movie> {
        return this.moviesRepository.save(movie);
    }

    async update(id: number, movie: Movie): Promise<Movie> {
        await this.moviesRepository.update(id, movie);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const result = await this.moviesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
    }
}

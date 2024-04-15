import { Entity, PrimaryGeneratedColumn, Column, Unique, } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
@Unique(['title'])
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;
}

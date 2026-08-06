import { Movie } from '@/domain/entities/Movie.js'
import type { CreateMovieCommand } from '@/application/types/CreateMovieCommand.js';

export interface CreateMoviePort {
  execute(input: CreateMovieCommand): Promise<Movie>;
}
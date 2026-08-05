import { Movie } from '@/domain/entities/Movie.ts'
import type { CreateMovieCommand } from '@/application/types/CreateMovieCommand.ts';

export interface CreateMoviePort {
  execute(input: CreateMovieCommand): Promise<Movie>;
}
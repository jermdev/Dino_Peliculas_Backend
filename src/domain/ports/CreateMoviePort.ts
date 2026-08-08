import type { CreateMovieCommand } from '@/application/types/CreateMovieCommand.js';
import type { CreateMovieResult } from '@/application/types/create-movie.result.js';

export interface CreateMoviePort {
  execute(input: CreateMovieCommand): Promise<CreateMovieResult>;
}
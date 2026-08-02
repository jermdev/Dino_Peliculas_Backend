import type { CreateMovieInput } from '@/domain/types/CreateMovieInput.ts'
import { Movie } from '@/domain/entities/Movie.ts'

export interface CreateMoviePort {
  execute(input: CreateMovieInput): Promise<Movie>;
}
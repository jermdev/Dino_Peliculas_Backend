import { Movie } from '@/domain/entities/Movie.js'

export type CreateMovieResult =
  | { success: true; movie: Movie }
  | { success: false; reason: 'MOVIE_ALREADY_REGISTERED'; originalNumIdFromOriginalSource: number }
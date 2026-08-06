import type { CreateMovieInput } from '@/domain/types/CreateMovieInput.js'

export type CreateMovieCommand = Omit<CreateMovieInput, 'id'>;
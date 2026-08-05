import type { CreateMovieInput } from '@/domain/types/CreateMovieInput.ts'

export type CreateMovieCommand = Omit<CreateMovieInput, 'id'>;
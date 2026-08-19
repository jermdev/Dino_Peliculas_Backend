import type {CreateMovieInput} from '@/domain/types/CreateMovieInput.js'

export type UpdatedMovieResponse = Omit<CreateMovieInput, 'urlHorizontalPoster' |  'urlVerticalPoster' |'urlMedia' > & {
    urlMedia: string;
    urlVerticalPoster: string;
    urlHorizontalPoster: string;
};
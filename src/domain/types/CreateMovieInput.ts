import { PathUrl } from '@/domain/value-objects/PathUrl.js'
export interface CreateMovieInput {
    id: string;
    title: string;
    description: string;
    urlHorizontalPoster: PathUrl;
    urlVerticalPoster: PathUrl;
    urlMedia: PathUrl;
    categories: string[];
    originalNumIdFromOriginalSource: number;
    originalAlphIdFromOriginalSource: string;
    subtitles?: string;
}
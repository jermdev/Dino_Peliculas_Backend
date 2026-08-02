import { PathUrl } from '@/domain/value-objects/PathUrl.ts'
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
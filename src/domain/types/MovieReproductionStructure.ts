import type { ReproductionStructure } from '@/domain/types/ReproductionStructure.ts'
export interface MovieReproductionStructure extends ReproductionStructure {
    urlMedia: string,
    urlHorizontalPoster: string,
    urlVerticalPoster: string,
    subtitles: string | null,
}
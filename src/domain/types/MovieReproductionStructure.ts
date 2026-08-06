import type { ReproductionStructure } from '@/domain/types/ReproductionStructure.js'
export interface MovieReproductionStructure extends ReproductionStructure {
    urlMedia: string,
    urlHorizontalPoster: string,
    urlVerticalPoster: string,
    subtitles: string | null,
}
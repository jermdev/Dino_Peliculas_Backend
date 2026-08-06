import type {ReproductionStructure} from '@/domain/types/ReproductionStructure.js'

interface Episode {
    titleEpisode: string,
    urlMedia: string,
    subtitles: string | null,

}

interface Season {
    id: string,
    numSeason: number,
    titleSeason: string,
    urlHorizontalPoster: string,
    urlVerticalPoster: string,
    description: string,
    episodes: Episode[],
}

export interface SerieReproductionStructure extends ReproductionStructure {
    seasons: Season[],
}


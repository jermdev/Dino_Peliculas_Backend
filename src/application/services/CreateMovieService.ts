import { Movie } from '@/domain/entities/Movie.js'
import type { CreateMoviePort } from '@/domain/ports/CreateMoviePort.js'
import type { CreateMovieCommand } from '@/application/types/CreateMovieCommand.js'
import type { MovieRepository } from '@/domain/ports/MovieRepository.js'
import { CategoryCatalogoService } from '@/application/services/CategoryCatalogoService.js'
import type { CreateMovieResult } from '@/application/types/create-movie.result.js'
import { generateId } from '@/application/helpers/generateId.js'

const MAX_ID_GENERATION_ATTEMPTS = 10

export class CreateMovieService implements CreateMoviePort {
  constructor(private readonly movieRepository: MovieRepository, private readonly categoryCatalogoService: CategoryCatalogoService) {}

  async execute(input: CreateMovieCommand): Promise<CreateMovieResult> {
    
    const existingByOriginalSourceId = await this.movieRepository.findByOriginalSourceId(input.originalNumIdFromOriginalSource)
    if (existingByOriginalSourceId) {
      return {
        success: false,
        reason: 'MOVIE_ALREADY_REGISTERED',
        originalNumIdFromOriginalSource: input.originalNumIdFromOriginalSource,
      }
    }

    let lastError: unknown;
    
    for (let attempt = 1; attempt <= MAX_ID_GENERATION_ATTEMPTS; attempt += 1) {
    const generatedId = generateId()

      const existing = await this.movieRepository.findById(generatedId)
      if (existing) {
        lastError = new Error(`Generated movie id already exists: ${generatedId}`)
        continue
      }

      const movie = new Movie({
        id: generatedId,
        title: input.title,
        description: input.description,
        categories: input.categories,
        originalNumIdFromOriginalSource: input.originalNumIdFromOriginalSource,
        originalAlphIdFromOriginalSource: input.originalAlphIdFromOriginalSource,
        urlMedia: input.urlMedia,
        urlHorizontalPoster: input.urlHorizontalPoster,
        urlVerticalPoster: input.urlVerticalPoster,
        subtitles: input.subtitles ? input.subtitles : '',
      })

      try {
        await this.movieRepository.save(movie)
        await this.ensureCategoriesExist(input.categories)
        return { success: true, movie }
      } catch (error: unknown) {
        lastError = error
        if (attempt < MAX_ID_GENERATION_ATTEMPTS) {
          continue
        }
        break
      }
    }

    throw new Error(
      `Failed to save movie after ${MAX_ID_GENERATION_ATTEMPTS} id generation attempts: ${
        lastError instanceof Error ? lastError.message : String(lastError)
      }`
    )
  }

  private async ensureCategoriesExist(categories: string[]): Promise<void> {
    if (!Array.isArray(categories)) {
      return
    }

    for (const cat of categories) {
      try {
        await this.categoryCatalogoService.createCategory(cat)
      } catch (e) {
        console.error(`Error creating category '${cat}':`, e)
      }
    }
  }
}

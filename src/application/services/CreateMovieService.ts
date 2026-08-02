import { Movie } from '@/domain/entities/Movie.ts'
import type { CreateMoviePort } from '@/domain/ports/CreateMoviePort.ts'
import type { CreateMovieInput } from '@/domain/types/CreateMovieInput.ts'
import type { MovieRepository } from '@/domain/ports/MovieRepository.ts'
import { CategoryCatalogoService } from '@/application/services/CategoryCatalogoService.ts'

export class CreateMovieService implements CreateMoviePort {
  constructor(private readonly movieRepository: MovieRepository, private readonly categoryCatalogoService: CategoryCatalogoService) {}

  async execute(input: CreateMovieInput): Promise<Movie> {
    const movie = new Movie({
      id: input.id,
      title: input.title,
      description: input.description,
      categories: input.categories,
      originalNumIdFromOriginalSource: input.originalNumIdFromOriginalSource,
      originalAlphIdFromOriginalSource: input.originalAlphIdFromOriginalSource,
      urlMedia: input.urlMedia,
      urlHorizontalPoster: input.urlHorizontalPoster,
      urlVerticalPoster: input.urlVerticalPoster,
      subtitles: input.subtitles? input.subtitles : ''
    })

    // Ensure categories are present in the central catálogo
    if (Array.isArray(input.categories)) {
      for (const cat of input.categories) {
        try {
          await this.categoryCatalogoService.createCategory(cat)
        } catch (e) {
          // don't break movie creation if catalog update fails; log or ignore
        }
      }
    }

    await this.movieRepository.save(movie)
    return movie
  }
}
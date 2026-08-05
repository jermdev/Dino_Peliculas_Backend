import { CreateMovieService } from '@/application/services/CreateMovieService.ts'
import { CreateMovieSchema } from '@/interfaces/schemas/requestSchemas.ts'
import { PathUrl } from '@/domain/value-objects/PathUrl.ts'

export class MovieController {
  constructor(private readonly createMovieService: CreateMovieService) {}

  async create(request: any) {
    const payload = CreateMovieSchema.parse(request.body)

    const moviePayload = {
      title: payload.title,
      description: payload.description,
      urlHorizontalPoster: new PathUrl(payload.urlHorizontalPoster),
      urlVerticalPoster: new PathUrl(payload.urlVerticalPoster),
      urlMedia: new PathUrl(payload.urlMedia),
      categories: payload.categories,
      originalNumIdFromOriginalSource: payload.originalNumIdFromOriginalSource,
      originalAlphIdFromOriginalSource: payload.originalAlphIdFromOriginalSource,
      ...(payload.subtitles !== undefined ? { subtitles: payload.subtitles } : {}),
    }

    return await this.createMovieService.execute(moviePayload)
  }
}

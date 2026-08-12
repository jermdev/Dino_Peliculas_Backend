import type { ContentRepository } from '@/domain/ports/ContentRepository.js'
import { RankingService } from '@/application/services/RankingService.js'
import type { Show } from '@/domain/entities/Show.js'
import type { OverViewMovie } from '@/application/types/overView-Movie.js'

export class RecommendationService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly rankingService = new RankingService()
  ) {}

  async relacionados(id: string, limit: number): Promise<Show[]> {
    const source = await this.contentRepository.findById(id)
    if (!source) {
      return []
    }

    const allContent = await this.contentRepository.findAll({ limit: 200, offset: 0 })
    return allContent
      .filter((content) => content.id !== id)
      .map((content) => ({
        content,
        score: this.rankingService.calculateRecommendationScore(content, source),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.content)
  }

  async paraPerfil(preferredGenres: string[], limit: number): Promise<OverViewMovie[]> {
    if (preferredGenres.length === 0) {
      const allContent = await this.contentRepository.findOverViewMovies({ limit: 200, offset: 0 })
      return this.rankingService.sortByCategoryCount(allContent).slice(0, limit)
    }

    const allContent = await this.contentRepository.findOverViewMovies({ limit: 200, offset: 0 })
    return allContent
      .map((content) => ({
        content,
        score: this.rankingService.calculateProfileScore(content, preferredGenres),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.content)
  }
}

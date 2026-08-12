import { CatalogoQueryService } from '@/application/services/CatalogoQueryService.js'
import { RecommendationService } from '@/application/services/RecomendationService.js'
import { RankingService } from '@/application/services/RankingService.js'
import { CategoryCatalogoService } from '@/application/services/CategoryCatalogoService.js'
import { CatalogoFilter } from '@/domain/value-objects/CatalogoFilter.js'
import type { HomeFeedSection } from '@/domain/types/HomeFeedSection.js'
import type { HomeFeedOptions } from '@/domain/types/HomeFeedOptions.js'

export class HomeFeedService {
  constructor(
    private readonly catalogService: CatalogoQueryService,
    private readonly recommendationService: RecommendationService,
    private readonly categoryCatalogoService: CategoryCatalogoService,
    private readonly rankingService = new RankingService()
  ) {}

  async buildDashboard(options?: HomeFeedOptions): Promise<{ sections: HomeFeedSection[] }> {
    const preferredGenres = options?.preferredGenres ?? []

    const heroSection = await this.catalogService.buscarPreview(new CatalogoFilter({ page: 1, limit: 20 }))
    const recommendedItems =
      preferredGenres.length > 0
        ? await this.recommendationService.paraPerfil(preferredGenres, 10)
        : heroSection.items.slice(0, 10)

    const sectionTitles = preferredGenres.length > 0
      ? preferredGenres.slice(0, 4)
      : (await this.categoryCatalogoService.getCategoryCatalogo()).slice(0, 4)

    const categorySections = await Promise.all(
      sectionTitles.map(async (category) => {
        const result = await this.catalogService.buscarPreview(
          new CatalogoFilter({ category: [category], page: 1, limit: 8 })
        )
        return {
          title: category,
          items: result.items,
        }
      })
    )

    const trendingItems = this.rankingService.sortByCategoryCount(heroSection.items).slice(0, 8)

    return {
      sections: [
        { title: 'Recomendado para ti', items: recommendedItems },
        { title: 'Tendencias', items: trendingItems },
        ...categorySections,
      ],
    }
  }
}


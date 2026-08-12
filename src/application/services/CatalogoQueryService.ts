import type { ContentRepository } from '@/domain/ports/ContentRepository.js'
import { CatalogoFilter } from '@/domain/value-objects/CatalogoFilter.js'
import type { CatalogoResult } from '@/domain/types/CatalogoResult.js'
import { RankingService } from '@/application/services/RankingService.js'
import { CategoryCatalogoService } from '@/application/services/CategoryCatalogoService.js'
import type { OverViewMovie } from '../types/overView-Movie.js'
import type { OverViewResult } from '@/domain/types/OverViewMovieResult.js'

export class CatalogoQueryService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly categoryCatalogoService: CategoryCatalogoService,
    private readonly rankingService = new RankingService()
  ) {}

  async buscar(filter: CatalogoFilter): Promise<CatalogoResult> {
    const rawItems = filter.query
      ? await this.contentRepository.searchByTitle(filter.query, filter.limit * filter.page)
      : await this.contentRepository.findAll({ limit: 70, offset: 0 })

    const filtered = rawItems.filter((content) => {
      if (!filter.categories || filter.categories.length === 0) {
        return true
      }

      return filter.categories.some((category) =>
        content.categories.some((contentCategory) => contentCategory.toLowerCase() === category.toLowerCase())
      )
    })

    const ranked = this.rankingService.sortForCatalog(filtered, filter.categories?.[0])
    const total = ranked.length
    const items = ranked.slice(filter.skip, filter.skip + filter.limit)
    const categories = (await this.categoryCatalogoService.getCategoryCatalogo()).slice(0, 12)

    return {
      items,
      total,
      page: filter.page,
      limit: filter.limit,
      categories,
    }
  }

  async buscarPreview(filter: CatalogoFilter): Promise<OverViewResult> {
    const rawItems = await this.contentRepository.findOverViewMovies({ limit: filter.limit, offset: 0 })

    const filtered = rawItems.filter((content) => {
      if (!filter.categories || filter.categories.length === 0) {
        return true
      }

      return filter.categories.some((category) =>
        content.categories.some((contentCategory) => contentCategory.name.toLocaleLowerCase() === category.toLowerCase())
      )
    })

    const ranked = this.rankingService.sortForCatalog(filtered, filter.categories?.[0])
    const total = ranked.length
    const items = ranked.slice(filter.skip, filter.skip + filter.limit)
    const categories = (await this.categoryCatalogoService.getCategoryCatalogo()).slice(0, 12)

    return {
      items,
      total,
      page: filter.page,
      limit: filter.limit,
      categories,
    }
  }

  async obtenerPorId(id: string) {
    return this.contentRepository.findById(id)
  }
}

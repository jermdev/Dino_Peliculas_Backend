import type { Show } from '@/domain/entities/Show.ts'

export class RankingService {
  sortByCategoryCount(items: Show[]): Show[] {
    return [...items].sort((a, b) => {
      const categoryDifference = b.categories.length - a.categories.length
      if (categoryDifference !== 0) {
        return categoryDifference
      }
      return a.title.localeCompare(b.title)
    })
  }

  sortForCatalog(items: Show[], primaryCategory?: string): Show[] {
    return [...items].sort((a, b) => {
      const aScore = this.computeCatalogScore(a, primaryCategory)
      const bScore = this.computeCatalogScore(b, primaryCategory)
      if (bScore !== aScore) {
        return bScore - aScore
      }
      return a.title.localeCompare(b.title)
    })
  }

  calculateRecommendationScore(item: Show, source: Show): number {
    const sharedGenres = this.countSharedGenres(item.categories, source.categories)
    const primaryGenreBonus = source.categories.length > 0 && item.categories.some((genre) => genre === source.categories[0]) ? 10 : 0
    const categoryDepth = Math.max(item.categories.length - 1, 0)

    return sharedGenres * 15 + primaryGenreBonus + categoryDepth
  }

  calculateProfileScore(item: Show, preferredGenres: string[]): number {
    const profileMatch = this.countSharedGenres(item.categories, preferredGenres)
    const categoryDepth = item.categories.length

    return profileMatch * 10 + categoryDepth
  }

  private computeCatalogScore(item: Show, primaryCategory?: string): number {
    const categoryCount = item.categories.length
    const primaryMatch = primaryCategory
      ? item.categories.some((genre) => genre.toLowerCase() === primaryCategory.toLowerCase())
        ? 15
        : 0
      : 0

    return categoryCount * 5 + primaryMatch
  }

  private countSharedGenres(first: string[], second: string[]): number {
    const normalizedSecond = second.map((genre) => genre.toLowerCase())
    return first.reduce((total, genre) => {
      return normalizedSecond.includes(genre.toLowerCase()) ? total + 1 : total
    }, 0)
  }
}

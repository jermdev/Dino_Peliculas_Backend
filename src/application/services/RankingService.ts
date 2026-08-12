import type { Rankable, CategoryLike } from '@/domain/types/Rankable.js'
import { categoryName } from '@/domain/types/Rankable.js'

export class RankingService {
  sortByCategoryCount<T extends Rankable>(items: T[]): T[] {
    return [...items].sort((a, b) => {
      const categoryDifference = b.categories.length - a.categories.length
      if (categoryDifference !== 0) {
        return categoryDifference
      }
      return a.title.localeCompare(b.title)
    })
  }

  sortForCatalog<T extends Rankable>(items: T[], primaryCategory?: string): T[] {
    return [...items].sort((a, b) => {
      const aScore = this.computeCatalogScore(a, primaryCategory)
      const bScore = this.computeCatalogScore(b, primaryCategory)
      if (bScore !== aScore) {
        return bScore - aScore
      }
      return a.title.localeCompare(b.title)
    })
  }

  calculateRecommendationScore<T extends Rankable>(item: T, source: T): number {
    const sharedGenres = this.countSharedGenres(item.categories, source.categories)
    const sourceFirst = source.categories[0]
    const primaryGenreBonus =
      source.categories.length > 0 && sourceFirst !== undefined && item.categories.some((genre) => categoryName(genre) === categoryName(sourceFirst))
        ? 10
        : 0
    const categoryDepth = Math.max(item.categories.length - 1, 0)

    return sharedGenres * 15 + primaryGenreBonus + categoryDepth
  }

  calculateProfileScore<T extends Rankable>(item: T, preferredGenres: string[]): number {
    const profileMatch = this.countSharedGenresWithStrings(item.categories, preferredGenres)
    const categoryDepth = item.categories.length

    return profileMatch * 10 + categoryDepth
  }

  private computeCatalogScore<T extends Rankable>(item: T, primaryCategory?: string): number {
    const categoryCount = item.categories.length
    const primaryMatch = primaryCategory
      ? item.categories.some((genre) => categoryName(genre).toLowerCase() === primaryCategory.toLowerCase())
        ? 15
        : 0
      : 0

    return categoryCount * 5 + primaryMatch
  }

  private countSharedGenres(first: CategoryLike[], second: CategoryLike[]): number {
    const normalizedSecond = second.map((genre) => categoryName(genre).toLowerCase())
    return first.reduce((total, genre) => {
      return normalizedSecond.includes(categoryName(genre).toLowerCase()) ? total + 1 : total
    }, 0)
  }

  private countSharedGenresWithStrings(first: CategoryLike[], second: string[]): number {
    const normalizedSecond = second.map((genre) => genre.toLowerCase())
    return first.reduce((total, genre) => {
      return normalizedSecond.includes(categoryName(genre).toLowerCase()) ? total + 1 : total
    }, 0)
  }
}
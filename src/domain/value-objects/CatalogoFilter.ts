export interface CatalogoFilterParams {
  query?: string
  category?: string[]
  page?: number
  limit?: number
}

export class CatalogoFilter {
  private readonly _query?: string
  private readonly _categories?: string[]
  private readonly _page: number
  private readonly _limit: number

  constructor(params: CatalogoFilterParams) {
    this._query = CatalogoFilter.normalizeQuery(params.query) || ''
    this._categories = CatalogoFilter.normalizeCategories(params.category) || []
    this._page = CatalogoFilter.validatePage(params.page)
    this._limit = CatalogoFilter.validateLimit(params.limit)
  }

  public get query(): string | undefined {
    return this._query
  }

  public get categories(): string[] | undefined {
    return this._categories
  }

  public get page(): number {
    return this._page
  }

  public get limit(): number {
    return this._limit
  }

  public get skip(): number {
    return (this._page - 1) * this._limit
  }

  private static normalizeQuery(value?: string): string | undefined {
    if (!value) {
      return undefined
    }
    const trimmed = value.trim()
    return trimmed.length === 0 ? undefined : trimmed
  }

  private static normalizeCategories(value?: string[]): string[] | undefined {
    if (!Array.isArray(value) || value.length === 0) {
      return undefined
    }

    const normalized = value
      .map((category) => category?.trim())
      .filter((category): category is string => typeof category === 'string' && category.length > 0)
      .map((category) => category.toLowerCase())

    return normalized.length > 0 ? normalized : undefined
  }

  private static validatePage(page?: number): number {
    if (page === undefined) {
      return 1
    }
    if (!Number.isInteger(page) || page < 1) {
      throw new Error('page must be an integer greater than or equal to 1')
    }
    return page
  }

  private static validateLimit(limit?: number): number {
    const DEFAULT_LIMIT = 20
    const MAX_LIMIT = 50

    if (limit === undefined) {
      return DEFAULT_LIMIT
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
      throw new Error(`limit must be an integer between 1 and ${MAX_LIMIT}`)
    }

    return limit
  }
}

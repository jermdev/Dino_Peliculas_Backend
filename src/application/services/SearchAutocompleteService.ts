import type { ContentRepository } from '@/domain/ports/ContentRepository.ts'
import type { SearchSuggestion } from '@/domain/types/SearchSuggestion.ts'

export class SearchAutocompleteService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async suggest(query: string, limit: number): Promise<SearchSuggestion[]> {
    const found = await this.contentRepository.searchByTitle(query, limit)

    return found.map((item) => ({
      id: item.id,
      title: item.title,
      categories: item.categories,
    }))
  }
}

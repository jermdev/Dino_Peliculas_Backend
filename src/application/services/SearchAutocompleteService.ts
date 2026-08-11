import type { ContentRepository } from '@/domain/ports/ContentRepository.js'
import type { SearchSuggestion } from '@/domain/types/SearchSuggestion.js'
import { sortByTitle } from '@/application/helpers/shortByTitle.js'

export class SearchAutocompleteService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async suggest(query: string, limit: number): Promise<SearchSuggestion[]> {
    const found = await this.contentRepository.searchByTitle(query, limit);

    const sorted = sortByTitle(found, query);

    return sorted.map((item) => ({
      id: item.id,
      title: item.title,
      categories: item.categories,
    }))
  }
}

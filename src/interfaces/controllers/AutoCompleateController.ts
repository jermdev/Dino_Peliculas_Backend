// src/interfaces/controllers/AutocompleteController.ts
import { SearchAutocompleteService } from '@/application/services/SearchAutocompleteService.js';
import { AutocompleteQuerySchema } from '@/interfaces/schemas/requestSchemas.js';

export class AutocompleteController {
  constructor(private autocompleteService: SearchAutocompleteService) {}

  async suggest(request: any) {
    const { q, limit } = AutocompleteQuerySchema.parse(request.query);
    return await this.autocompleteService.suggest(q, limit);
  }
}
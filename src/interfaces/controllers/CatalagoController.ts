import { CatalogoQueryService } from '@/application/services/CatalogoQueryService.ts';
import { CatalogoFilter } from '@/domain/value-objects/CatalogoFilter.ts';
import { CatalogQuerySchema } from '@/interfaces/schemas/requestSchemas.ts';

export class CatalogController {
  constructor(private catalogService: CatalogoQueryService) {}

  async search(request: any) {
    // Validar y extraer query params
    const { q, category,  page, limit } = CatalogQuerySchema.parse(request.query);
    
    // Construir el filtro (Value Object)
    const filterParams: ConstructorParameters<typeof CatalogoFilter>[0] = {
      page,
      limit,
    }

    if (typeof q === 'string' && q.trim().length > 0) {
      filterParams.query = q
    }

    if (typeof category === 'string' && category.trim().length > 0) {
      filterParams.category = category.split(',')
    }

    const filter = new CatalogoFilter(filterParams);

    return await this.catalogService.buscar(filter);
  }
}
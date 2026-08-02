// src/interfaces/controllers/ContentController.ts
import { CatalogoQueryService } from '@/application/services/CatalogoQueryService.ts';
import { RecommendationService } from '@/application/services/RecomendationService.ts';
import { ContentParamsSchema, RecommendationParamsSchema, RecommendationQuerySchema } from '@/interfaces/schemas/requestSchemas.ts';

export class ContentController {
  constructor(
    private catalogService: CatalogoQueryService,
    private recommendationService: RecommendationService
  ) {}

  // GET /api/content/:id → Obtener detalle de película/serie
  async getDetail(request: any) {
    const { id } = ContentParamsSchema.parse(request.params);
    return await this.catalogService.obtenerPorId(id); // <-- Necesitas añadir este método a CatalogQueryService
  }

  // GET /api/content/:id/recommendations → Recomendaciones relacionadas
  async getRecommendations(request: any) {
    const { id } = RecommendationParamsSchema.parse(request.params);
    const { limit } = RecommendationQuerySchema.parse(request.query);
    return await this.recommendationService.relacionados(id, limit);
  }
}
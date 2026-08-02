// // src/di/container.ts
// import { Pool } from 'pg';
// import { SqlContentRepository } from '../infrastructure/persistence/SqlContentRepository';
// import { CatalogoQueryService } from '@/application/services/CatalogoQueryService.ts';
// import { HomeFeedService } from '@/application/services/HomeFeedService.ts';
// import { RecommendationService } from '@/application/services/RecomendationService.ts';
// import { SearchAutocompleteService } from '@/application/services/SearchAutocompleteService.ts';
// import { RankingService } from '@/application/services/';

// // Estrategias de recomendación
// // import { PopularityStrategy } from '../application/strategies/PopularityStrategy';
// // import { SameGenreStrategy } from '../application/strategies/SameGenreStrategy';
// // import { SameCastStrategy } from '../application/strategies/SameCastStrategy';

// // Controladores
// import { HomeController } from '@/interfaces/controllers/HomeController.ts';
// import { CatalogController } from '@/interfaces/controllers/CatalagoController.ts';
// import { ContentController } from '@/interfaces/controllers/ContentController.ts';
// import { AutocompleteController } from '@/interfaces/controllers/AutoCompleateController.ts';

// // 1. Infraestructura (Base de Datos)
// const dbPool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '5432'),
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'streaming_db',
// });
// const contentRepository = new SqlContentRepository(dbPool);

// // 2. Estrategias de Recomendación
// // const popularityStrategy = new PopularityStrategy(contentRepository);
// // const sameGenreStrategy = new SameGenreStrategy(contentRepository);
// // const sameCastStrategy = new SameCastStrategy(contentRepository);

// // 3. Servicios de Aplicación
// const rankingService = new RankingService();
// const recommendationService = new RecommendationService(
//   [popularityStrategy, sameGenreStrategy, sameCastStrategy],
//   rankingService
// );
// const categoryCatalogoRepository = /* instancia de repositorio de catálogo de categorías */
// const categoryCatalogoService = new CategoryCatalogoService(categoryCatalogoRepository)
// const catalogService = new CatalogoQueryService(contentRepository, categoryCatalogoService)
// const homeFeedService = new HomeFeedService(catalogService, recommendationService, categoryCatalogoService);
// const autocompleteService = new SearchAutocompleteService(contentRepository);

// // 4. Controladores (se les inyectan los servicios)
// export const container = {
//   homeController: new HomeController(homeFeedService),
//   catalogController: new CatalogController(catalogService),
//   contentController: new ContentController(catalogService, recommendationService),
//   autocompleteController: new AutocompleteController(autocompleteService),
// };
import Fastify from 'fastify'
import 'dotenv/config'
import { createRouter } from '@/interfaces/router/router.js'

import { HomeController } from '@/interfaces/controllers/HomeController.js'
import { MovieController,  } from '@/interfaces/controllers/MovieController.js'
import { AutocompleteController } from './interfaces/controllers/AutoCompleateController.js'
import { ContentController } from '@/interfaces/controllers/ContentController.js'

import { CreateMovieService } from '@/application/services/CreateMovieService.js'
import { CatalogoQueryService } from '@/application/services/CatalogoQueryService.js'
import { HomeFeedService } from '@/application/services/HomeFeedService.js'
import { RecommendationService } from '@/application/services/RecomendationService.js'
import { SearchAutocompleteService } from '@/application/services/SearchAutocompleteService.js'
import { CategoryCatalogoService } from '@/application/services/CategoryCatalogoService.js'

import { PrismaMovieRepository } from '@/infrastructure/persistence/PrismaMovieRepository.js'
import { PrismaCategoryCatalogoRepository } from '@/infrastructure/persistence/PrismaCategoryCatalogoRepository.js'

const fastify = Fastify({
  logger: true,
})

const movieRepository = new PrismaMovieRepository()
const categoryCatalogoRepository = new PrismaCategoryCatalogoRepository()
const categoryCatalogoService = new CategoryCatalogoService(categoryCatalogoRepository)
const createMovieService = new CreateMovieService(movieRepository, categoryCatalogoService)
const catalogService = new CatalogoQueryService(movieRepository, categoryCatalogoService)
const recommendationService = new RecommendationService(movieRepository)
const searchAutocompleteService = new SearchAutocompleteService(movieRepository)
const homeFeedService = new HomeFeedService(
  catalogService,
  recommendationService,
  categoryCatalogoService
)
const homeController = new HomeController(homeFeedService)
const movieController = new MovieController(createMovieService)
const autocompleteController = new AutocompleteController(searchAutocompleteService)
const contentController = new ContentController(catalogService, recommendationService)

createRouter(fastify, {
  home: homeController,
  movie: movieController,
  autocomplete:autocompleteController,
  content: contentController
})

const port = parseInt(process.env.PORT ?? '3000', 10)
const host = process.env.HOST ?? '0.0.0.0'

const start = async () => {
  try {
    await fastify.listen({ port, host })
    console.log(`Server listening on http://${host}:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()


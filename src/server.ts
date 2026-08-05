import Fastify from 'fastify'
import 'dotenv/config'
import { createRouter } from '@/interfaces/router/router.ts'
import { HomeController } from '@/interfaces/controllers/HomeController.ts'
import { MovieController } from '@/interfaces/controllers/MovieController.ts'
import { CreateMovieService } from '@/application/services/CreateMovieService.ts'
import { CatalogoQueryService } from '@/application/services/CatalogoQueryService.ts'
import { HomeFeedService } from '@/application/services/HomeFeedService.ts'
import { RecommendationService } from '@/application/services/RecomendationService.ts'
import { CategoryCatalogoService } from '@/application/services/CategoryCatalogoService.ts'
import { PrismaMovieRepository } from '@/infrastructure/persistence/PrismaMovieRepository.ts'
import { PrismaCategoryCatalogoRepository } from '@/infrastructure/persistence/PrismaCategoryCatalogoRepository.ts'

const fastify = Fastify({
  logger: true,
})

const movieRepository = new PrismaMovieRepository()
const categoryCatalogoRepository = new PrismaCategoryCatalogoRepository()
const categoryCatalogoService = new CategoryCatalogoService(categoryCatalogoRepository)
const createMovieService = new CreateMovieService(movieRepository, categoryCatalogoService)
const catalogService = new CatalogoQueryService(movieRepository, categoryCatalogoService)
const recommendationService = new RecommendationService(movieRepository)
const homeFeedService = new HomeFeedService(
  catalogService,
  recommendationService,
  categoryCatalogoService
)
const homeController = new HomeController(homeFeedService)
const movieController = new MovieController(createMovieService)

createRouter(fastify, {
  home: homeController,
  movie: movieController,
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


import type { FastifyInstance } from 'fastify'
import { HomeController } from '@/interfaces/controllers/HomeController.ts'
import { MovieController } from '@/interfaces/controllers/MovieController.ts'
import { registerHomeRoutes } from '@/interfaces/router/homeRoutes.ts'
import { registerMovieRoutes } from '@/interfaces/router/movieRoutes.ts'

export function createRouter(fastify: FastifyInstance, controllers: {
  home: HomeController
  movie: MovieController
}) {
  registerHomeRoutes(fastify, controllers.home)
  registerMovieRoutes(fastify, controllers.movie)
}

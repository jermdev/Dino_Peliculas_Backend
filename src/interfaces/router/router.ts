import type { FastifyInstance } from 'fastify'
import { HomeController } from '@/interfaces/controllers/HomeController.js'
import { MovieController } from '@/interfaces/controllers/MovieController.js'
import { registerHomeRoutes } from '@/interfaces/router/homeRoutes.js'
import { registerMovieRoutes } from '@/interfaces/router/movieRoutes.js'

export function createRouter(fastify: FastifyInstance, controllers: {
  home: HomeController
  movie: MovieController
}) {
  registerHomeRoutes(fastify, controllers.home)
  registerMovieRoutes(fastify, controllers.movie)
}

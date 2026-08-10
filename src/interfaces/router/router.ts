import type { FastifyInstance } from 'fastify'
import { AutocompleteController } from '@/interfaces/controllers/AutoCompleateController.js'
import { HomeController } from '@/interfaces/controllers/HomeController.js'
import { MovieController } from '@/interfaces/controllers/MovieController.js'
import { registerHomeRoutes } from '@/interfaces/router/homeRoutes.js'
import { registerMovieRoutes } from '@/interfaces/router/movieRoutes.js'
import { autocompleteRoutes } from '@/interfaces/router/autocompleteMovieRoutes.js'

export function createRouter(fastify: FastifyInstance, controllers: {
  home: HomeController
  movie: MovieController
  autocomplete: AutocompleteController
}) {
  registerHomeRoutes(fastify, controllers.home)
  registerMovieRoutes(fastify, controllers.movie)
  autocompleteRoutes(fastify, controllers.autocomplete)
}

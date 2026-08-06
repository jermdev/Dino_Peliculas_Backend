import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MovieController } from '@/interfaces/controllers/MovieController.js'

export function registerMovieRoutes(fastify: FastifyInstance, controller: MovieController) {
  fastify.post('/api/movies', async (request: FastifyRequest, reply: FastifyReply) => {
    const createdMovie = await controller.create(request)

    if (!createdMovie) {
      return reply.code(400).send({ error: 'Failed to create movie' })
    }
    
    reply.code(201).send(createdMovie)
  })
}

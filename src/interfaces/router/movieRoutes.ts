import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { MovieController } from '@/interfaces/controllers/MovieController.js'
import { ContentController } from '@/interfaces/controllers/ContentController.js'

export function registerMovieRoutes(fastify: FastifyInstance, controller: MovieController) {
  fastify.post('/api/movies', async (request: FastifyRequest, reply: FastifyReply) => {
    const createdMovie = await controller.create(request)

    if (!createdMovie) {
      return reply.code(400).send({ error: 'Failed to create movie' })
    }
    
    reply.code(201).send(createdMovie)
  })
}

export function getContentByIdRoutes(fastify: FastifyInstance, controller: ContentController) {
  fastify.get('/api/content/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const contentDetail = await controller.getDetail(request)
    
  if (!contentDetail) {
      return reply.code(404).send({ error: 'Content not found' })
  }

    reply.code(200).send(contentDetail)
  })
}
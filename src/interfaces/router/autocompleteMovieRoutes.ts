import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AutocompleteController } from '@/interfaces/controllers/AutoCompleateController.js'

export function autocompleteRoutes(fastify: FastifyInstance, controller: AutocompleteController) {
  fastify.get('/api/movie/autocomplete', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const suggestions = await controller.suggest(request)
      reply.code(200).send(suggestions)
    } catch (error) {
      reply.code(400).send({ error: 'Invalid query parameters' })
    }
  })}
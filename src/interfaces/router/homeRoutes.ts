import type { FastifyInstance } from 'fastify'
import { HomeController } from '@/interfaces/controllers/HomeController.js'

export function registerHomeRoutes(fastify: FastifyInstance, controller: HomeController) {
  fastify.get('/api/home', async () => controller.getDashBoard())
}

import {z} from 'zod'
import { UpdateMovieContentSchema } from '@/interfaces/schemas/requestSchemas.js'

export type UpdateMovieContentDTO = z.infer<typeof UpdateMovieContentSchema>
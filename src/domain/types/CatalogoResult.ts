import type { Show } from '@/domain/entities/Show.js'

export interface CatalogoResult {
  items: Show[]
  page: number
  limit: number
  total: number
  categories: string[]
}

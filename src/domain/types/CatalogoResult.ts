import type { Show } from '@/domain/entities/Show.ts'

export interface CatalogoResult {
  items: Show[]
  page: number
  limit: number
  total: number
  categories: string[]
}

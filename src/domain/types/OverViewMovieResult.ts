import type { OverViewMovie } from '@/application/types/overView-Movie.js'
export interface OverViewResult {
  items: OverViewMovie[]
  page: number
  limit: number
  total: number
  categories: string[]
}
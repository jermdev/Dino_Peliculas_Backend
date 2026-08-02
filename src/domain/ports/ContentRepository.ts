import type { Show } from '@/domain/entities/Show.ts'

export interface ContentRepository {
  findById(id: string): Promise<Show | null>
  findAll(opts?: { limit?: number; offset?: number }): Promise<Show[]>
  searchByTitle(query: string, limit: number): Promise<Show[]>
}

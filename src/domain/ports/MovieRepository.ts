import type { Movie } from '@/domain/entities/Movie.ts'
import type { ContentRepository } from '@/domain/ports/ContentRepository.ts'

export interface MovieRepository extends ContentRepository {
  save(movie: Movie): Promise<void>            // crea o actualiza
  findById(id: string): Promise<Movie | null>
  findAll(opts?: { limit?: number; offset?: number }): Promise<Movie[]>
  delete(id: string): Promise<void>
  // Opcionales según dominio:
  findByOriginalSourceId(originalNumId: number): Promise<Movie | null>
}